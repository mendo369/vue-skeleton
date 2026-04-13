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
        transform: `translateY(${translateYs[i] ?? 0}px)`,
      }"
      :aria-label="item.label"
      @click="item.onClick?.()"
    >
      <component :is="item.icon" class="icon" :stroke-width="1.5" />
    </button>
  </div>
</template>

<style scoped>
.dock {
  --size: 82px;
  --icon: 28px;
  --gap: 12px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--gap);
  padding: 32px 20px;
  overflow: hidden;
  max-width: 100dvw;
}

@media (max-width: 640px) {
  .dock {
    --size: 42px;
    --icon: 22px;
    --gap: 8px;
    padding: 24px 10px;
  }
}

.dock-item {
  width: var(--size);
  height: var(--size);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #000;
  border: none;
  cursor: pointer;
  flex-shrink: 0;
  will-change: transform;
  transition: all 0.2s ease;
  color: #fff;
}

.icon {
  width: var(--icon);
  height: var(--icon);
}

.dock-item:hover {
  background: #801586;
  color: white;
  transform: scale(1.1) translateY(-5px) !important;
}
</style>
