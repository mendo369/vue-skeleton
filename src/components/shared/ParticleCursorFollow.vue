<script setup lang="ts">
import { onMounted, onUnmounted, ref, type Ref } from "vue";

interface Particle {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  size: number;
  hueShift: number;
  waveOffset: number;
}

interface MousePosition {
  x: number;
  y: number;
}

interface Props {
  particleCount?: number;
  particleSize?: number;
  attractionRadius?: number;
  waveAmplitude?: number;
  waveSpeed?: number;
  hueSpeed?: number;
  friction?: number;
  ease?: number;
}

const props = withDefaults(defineProps<Props>(), {
  particleCount: 220,
  particleSize: 2,
  attractionRadius: 130,
  waveAmplitude: 28,
  waveSpeed: 0.018,
  hueSpeed: 0.25,
  friction: 0.93,
  ease: 0.04,
});

const canvasRef: Ref<HTMLCanvasElement | null> = ref(null);
const ctxRef: Ref<CanvasRenderingContext2D | null> = ref(null);
const particles: Ref<Particle[]> = ref([]);
const mouse: Ref<MousePosition> = ref({ x: -9999, y: -9999 });
const animationFrameId: Ref<number | null> = ref(null);
let time = 0;
let hueBase = 0;

function initParticles(): void {
  if (!canvasRef.value) return;
  const { width, height } = canvasRef.value;

  particles.value = Array.from(
    { length: props.particleCount },
    (): Particle => {
      const x = Math.random() * width;
      const y = Math.random() * height;
      return {
        baseX: x,
        baseY: y,
        x,
        y,
        vx: 0,
        vy: 0,
        angle: 0,
        size: props.particleSize * (0.75 + Math.random()),
        hueShift: Math.random() * 60 - 30,
        waveOffset: Math.random() * 1000,
      };
    },
  );
}

function updateParticles(): void {
  if (!canvasRef.value) return;
  const { width, height } = canvasRef.value;
  time += props.waveSpeed;
  hueBase = (hueBase + props.hueSpeed) % 360;

  particles.value.forEach((p) => {
    const waveX = Math.sin(time + p.waveOffset * 0.09) * props.waveAmplitude;
    const waveY =
      Math.cos(time * 0.75 + p.waveOffset * 0.18) * props.waveAmplitude;

    const targetX = p.baseX + waveX;
    const targetY = p.baseY + waveY;

    const dx = mouse.value.x - p.x;
    const dy = mouse.value.y - p.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < props.attractionRadius) {
      const force = (props.attractionRadius - dist) / props.attractionRadius;
      p.vx += dx * force * 0.018;
      p.vy += dy * force * 0.018;
    }

    p.vx += (targetX - p.x) * props.ease;
    p.vy += (targetY - p.y) * props.ease;
    p.vx *= props.friction;
    p.vy *= props.friction;

    p.x += p.vx;
    p.y += p.vy;

    p.angle = Math.atan2(p.vy, p.vx) + Math.PI / 4;

    if (p.x < -60) {
      p.x = p.baseX = width + 60;
    }
    if (p.x > width + 60) {
      p.x = p.baseX = -60;
    }
    if (p.y < -60) {
      p.y = p.baseY = height + 60;
    }
    if (p.y > height + 60) {
      p.y = p.baseY = -60;
    }
  });
}

function draw(): void {
  const ctx = ctxRef.value;
  if (!ctx || !canvasRef.value) return;
  const { width, height } = canvasRef.value;

  ctx.clearRect(0, 0, width, height);

  particles.value.forEach((p) => {
    const hue = (hueBase + p.hueShift + 360) % 360;

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.angle);
    ctx.beginPath();
    ctx.moveTo(-p.size, 0);
    ctx.lineTo(p.size, 0);
    ctx.lineWidth = p.size * 0.55;
    ctx.strokeStyle = `hsla(${hue}, 85%, 55%, 0.75)`;
    ctx.lineCap = "round";
    ctx.stroke();
    ctx.restore();
  });

  updateParticles();
  animationFrameId.value = requestAnimationFrame(draw);
}

function handleMouseMove(e: MouseEvent): void {
  if (!canvasRef.value) return;
  const rect = canvasRef.value.getBoundingClientRect();
  mouse.value.x = e.clientX - rect.left;
  mouse.value.y = e.clientY - rect.top;
}

function handleMouseLeave(): void {
  mouse.value.x = -9999;
  mouse.value.y = -9999;
}

onMounted(() => {
  if (!canvasRef.value) return;
  const canvas = canvasRef.value;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctxRef.value = ctx;

  const resize = () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    initParticles();
  };

  resize();
  window.addEventListener("resize", resize);
  canvas.addEventListener("mousemove", handleMouseMove);
  canvas.addEventListener("mouseleave", handleMouseLeave);

  draw();

  onUnmounted(() => {
    window.removeEventListener("resize", resize);
    canvas.removeEventListener("mousemove", handleMouseMove);
    canvas.removeEventListener("mouseleave", handleMouseLeave);
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
  background: white;
}

.particle-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: all;
}

.content {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
</style>
