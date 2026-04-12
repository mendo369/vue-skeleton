<script setup lang="ts">
import { ref, onMounted, onUnmounted, type Component, type Ref } from "vue";

interface DockItem {
  id: string | number;
  icon: Component;
  label?: string;
  onClick?: () => void;
}

interface Props {
  items: DockItem[];
  itemSize?: number;
  iconSize?: number;
  waveAmplitude?: number;
  waveSpeed?: number;
  waveSpread?: number;
}

const props = withDefaults(defineProps<Props>(), {
  itemSize: 52,
  iconSize: 30,
  waveAmplitude: 14,
  waveSpeed: 0.055,
  waveSpread: 0.45,
});

const translateYs: Ref<number[]> = ref([]);
let time = 0;
let rafId: number | null = null;

function loop() {
  rafId = requestAnimationFrame(loop);
  time += props.waveSpeed;
  props.items.forEach((_, i) => {
    translateYs.value[i] =
      Math.sin(time + i * props.waveSpread) * props.waveAmplitude;
  });
}

onMounted(() => {
  translateYs.value = props.items.map(() => 0);
  loop();
});

onUnmounted(() => {
  if (rafId) cancelAnimationFrame(rafId);
});
</script>

<template>
  <div class="dock">
    <button
      v-for="(item, i) in items"
      :key="item.id"
      class="dock-item hover:bg-main-purple hover:text-white"
      :style="{
        width: `${itemSize}px`,
        height: `${itemSize}px`,
        transform: `translateY(${translateYs[i] ?? 0}px)`,
      }"
      :aria-label="item.label"
      @click="item.onClick?.()"
    >
      <component :is="item.icon" :size="iconSize" :stroke-width="1.5" />
    </button>
  </div>
</template>

<style scoped>
.dock {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 32px 20px;
  overflow: visible;
}

.dock-item {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #000;
  /* background: #f0f0f0; */
  border: none;
  cursor: pointer;
  flex-shrink: 0;
  will-change: transform;
  transition: background 0.15s;
  color: #fff;
  /* color: #111; */
}

.dock-item:hover {
  background: var(--main-purple);
  color: white;
}
</style>
