<script setup lang="ts">
import { ref, onMounted, onUnmounted, type Ref } from "vue";

interface DockItem {
  id: string | number;
  label?: string;
  icon?: string;
}

interface Props {
  items: DockItem[];
  itemSize?: number;
  waveAmplitude?: number;
  waveSpeed?: number;
  waveSpread?: number;
}

const props = withDefaults(defineProps<Props>(), {
  itemSize: 52,
  waveAmplitude: 14,
  waveSpeed: 0.06,
  waveSpread: 0.5,
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
    <div
      v-for="(item, i) in items"
      :key="item.id"
      class="dock-item"
      :style="{
        width: `${itemSize}px`,
        height: `${itemSize}px`,
        transform: `translateY(${translateYs[i] ?? 0}px)`,
      }"
      :aria-label="item.label"
    >
      <slot :item="item" :index="i">
        <span class="icon-inner">{{
          item.icon ?? item.label?.[0] ?? "?"
        }}</span>
      </slot>
    </div>
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
  background: #f0f0f0;
  cursor: pointer;
  flex-shrink: 0;
  will-change: transform;
  transition: background 0.15s;
}

.dock-item:hover {
  background: #e0e0e0;
}

.icon-inner {
  font-size: 22px;
  line-height: 1;
  user-select: none;
}
</style>
