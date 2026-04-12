<script setup lang="ts">
import { onMounted, onUnmounted, ref, type Ref } from "vue";

interface Particle3D {
  x: number;
  y: number;
  z: number;
  baseX: number;
  baseY: number;
  baseZ: number;
  projectedX: number;
  projectedY: number;
  size: number;
  opacity: number;
  hue: number;
}

interface MousePosition {
  x: number;
  y: number;
  isActive: boolean;
}

interface Props {
  particleCount?: number;
  particleSize?: number;
  sphereRadius?: number;
  rotationSpeed?: number;
  mouseInfluence?: number;
  perspective?: number;
  breathingSpeed?: number;
  breathingAmplitude?: number;
}

const props = withDefaults(defineProps<Props>(), {
  particleCount: 800,
  particleSize: 1.8,
  sphereRadius: 220,
  rotationSpeed: 0.002,
  mouseInfluence: 0.0005,
  perspective: 1000,
  breathingSpeed: 0.0015,
  breathingAmplitude: 0.15, // 15% de expansión
});

const canvasRef: Ref<HTMLCanvasElement | null> = ref(null);
const ctxRef: Ref<CanvasRenderingContext2D | null> = ref(null);
const particles: Ref<Particle3D[]> = ref([]);
const mouse: Ref<MousePosition> = ref({ x: 0, y: 0, isActive: false });
const animationFrameId: Ref<number | null> = ref(null);

let rotationX = 0;
let rotationY = 0;
let targetRotationX = 0;
let targetRotationY = 0;
let centerX = 0;
let centerY = 0;
let time = 0;

const colorPalette = [
  { h: 220, s: 85, l: 65 },
  { h: 240, s: 80, l: 60 },
  { h: 260, s: 75, l: 65 },
  { h: 280, s: 85, l: 70 },
  { h: 210, s: 90, l: 60 },
];

function fibonacciSphere(
  count: number,
  radius: number,
): { x: number; y: number; z: number }[] {
  const points: { x: number; y: number; z: number }[] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const radiusAtY = Math.sqrt(1 - y * y);
    const theta = goldenAngle * i;

    const x = Math.cos(theta) * radiusAtY;
    const z = Math.sin(theta) * radiusAtY;

    points.push({
      x: x * radius,
      y: y * radius,
      z: z * radius,
    });
  }
  return points;
}

function initParticles(): void {
  if (!canvasRef.value) return;
  const { width, height } = canvasRef.value;
  centerX = width / 2;
  centerY = height / 2;

  particles.value = [];
  const spherePoints = fibonacciSphere(props.particleCount, props.sphereRadius);

  spherePoints.forEach((point) => {
    const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
    particles.value.push({
      x: point.x,
      y: point.y,
      z: point.z,
      baseX: point.x,
      baseY: point.y,
      baseZ: point.z,
      projectedX: 0,
      projectedY: 0,
      size: props.particleSize * (0.8 + Math.random() * 1.5),
      opacity: 0.4 + Math.random() * 0.4,
      hue: (color.h + (Math.random() - 0.5) * 20 + 360) % 360,
    });
  });
}

function rotatePoint(
  x: number,
  y: number,
  z: number,
  rotX: number,
  rotY: number,
) {
  // Y-axis rotation
  let x1 = x * Math.cos(rotY) - z * Math.sin(rotY);
  let z1 = x * Math.sin(rotY) + z * Math.cos(rotY);
  // X-axis rotation
  let y2 = y * Math.cos(rotX) - z1 * Math.sin(rotX);
  let z2 = y * Math.sin(rotX) + z1 * Math.cos(rotX);
  return { x: x1, y: y2, z: z2 };
}

function updateAndDraw(): void {
  const ctx = ctxRef.value;
  if (!ctx || !canvasRef.value) return;
  const { width, height } = canvasRef.value;

  ctx.clearRect(0, 0, width, height);

  time += props.breathingSpeed;
  // Factor de escala de respiración (1.0 +/- amplitud)
  const breathScale = 1 + Math.sin(time) * props.breathingAmplitude;

  targetRotationY += props.rotationSpeed;
  if (mouse.value.isActive) {
    targetRotationY +=
      ((mouse.value.x - centerX) / width) * props.mouseInfluence * 50;
    targetRotationX +=
      ((mouse.value.y - centerY) / height) * props.mouseInfluence * 25;
  }

  rotationX += (targetRotationX - rotationX) * 0.05;
  rotationY += (targetRotationY - rotationY) * 0.05;
  rotationX = Math.max(-Math.PI / 4, Math.min(Math.PI / 4, rotationX));

  const sorted = particles.value
    .map((p) => {
      // Aplicamos la escala de respiración antes de rotar
      const bx = p.baseX * breathScale;
      const by = p.baseY * breathScale;
      const bz = p.baseZ * breathScale;

      const rot = rotatePoint(bx, by, bz, rotationX, rotationY);
      const scale = props.perspective / (props.perspective + rot.z);

      return {
        px: rot.x * scale + centerX,
        py: rot.y * scale + centerY,
        scale,
        z: rot.z,
        hue: p.hue,
        opacity: p.opacity,
        size: p.size,
      };
    })
    .sort((a, b) => b.z - a.z); // Dibujamos de atrás hacia adelante

  sorted.forEach((p) => {
    const depthFactor = (p.scale - 0.5) * 2;
    ctx.beginPath();
    ctx.arc(p.px, p.py, Math.max(0.3, p.size * p.scale), 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${p.hue}, 80%, 65%, ${p.opacity * (0.2 + depthFactor * 0.8)})`;
    ctx.fill();
  });

  animationFrameId.value = requestAnimationFrame(updateAndDraw);
}

function handleMouseMove(e: MouseEvent): void {
  if (!canvasRef.value) return;
  const rect = canvasRef.value.getBoundingClientRect();
  mouse.value.x = e.clientX - rect.left;
  mouse.value.y = e.clientY - rect.top;
  mouse.value.isActive = true;
}

onMounted(() => {
  const canvas = canvasRef.value;
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctxRef.value = ctx;

  const resize = () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    centerX = canvas.width / 2;
    centerY = canvas.height / 2;
    initParticles();
  };

  resize();
  window.addEventListener("resize", resize);
  window.addEventListener("mousemove", handleMouseMove);
  canvas.addEventListener("mouseleave", () => (mouse.value.isActive = false));

  updateAndDraw();

  onUnmounted(() => {
    window.removeEventListener("resize", resize);
    window.removeEventListener("mousemove", handleMouseMove);
    if (animationFrameId.value) cancelAnimationFrame(animationFrameId.value);
  });
});
</script>

<template>
  <div class="particle-container">
    <canvas ref="canvasRef" class="particle-canvas" />
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.particle-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  /* background: transparent; */
}

.particle-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.content {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
}
</style>
