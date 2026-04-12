<script setup lang="ts">
interface Props {
  spinDuration?: string;
  colors?: string[];
  borderWidth?: number;
  borderRadius?: number;
}

const props = withDefaults(defineProps<Props>(), {
  spinDuration: "6s",
  colors: () => ["#f9a8d4", "#fde68a", "#bbf7d0", "#a5f3fc", "#c4b5fd"],
  borderWidth: 3,
  borderRadius: 16,
});

const conicStops = props.colors.concat(props.colors[0]).join(", ");
</script>

<template>
  <div
    class="spinning-card-wrap"
    :style="{
      padding: `${borderWidth}px`,
      borderRadius: `${borderRadius}px`,
    }"
  >
    <div
      class="spinning-card-glow"
      :style="{
        '--conic': `conic-gradient(from 0deg, ${conicStops})`,
        '--duration': spinDuration,
      }"
    />
    <div
      class="spinning-card-inner"
      :style="{ borderRadius: `${borderRadius - borderWidth}px` }"
    >
      <slot />
    </div>
  </div>
</template>

<style scoped>
.spinning-card-wrap {
  position: relative;
  overflow: hidden;
  display: block;
}

.spinning-card-glow {
  position: absolute;
  inset: -60%;
  background: var(--conic);
  border-radius: 50%;
  animation: spin-border var(--duration, 6s) linear infinite;
  opacity: 0.9;
}

.spinning-card-inner {
  position: relative;
  z-index: 1;
  background: #ffffff;
  overflow: hidden;
  width: 100%;
  height: 100%;
}

@keyframes spin-border {
  to {
    transform: rotate(360deg);
  }
}
</style>
