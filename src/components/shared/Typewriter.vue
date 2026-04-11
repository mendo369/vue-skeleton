<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

interface Props {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  loop?: boolean;
  blinkSpeed?: string;
}

const props = withDefaults(defineProps<Props>(), {
  words: () => ["Simetri-K", "Eficiencia", "Escalabilidad"],
  typingSpeed: 150,
  deletingSpeed: 100,
  pauseDuration: 2000,
  loop: true,
  blinkSpeed: "0.8s",
});

const emit = defineEmits(['on-finished']);

const displayText = ref("");
const wordIndex = ref(0);
const charIndex = ref(0);
const isDeleting = ref(false);
const isFinished = ref(false);
let timeoutId: number | null = null;

function type() {
  if (isFinished.value) return;

  const currentWord = props.words[wordIndex.value];

  if (isDeleting.value) {
    displayText.value = currentWord.substring(0, charIndex.value - 1);
    charIndex.value--;
  } else {
    displayText.value = currentWord.substring(0, charIndex.value + 1);
    charIndex.value++;
  }

  let nextSpeed = isDeleting.value ? props.deletingSpeed : props.typingSpeed;

  if (!isDeleting.value && charIndex.value === currentWord.length) {
    // If it's the last word and loop is false, stop here
    if (!props.loop && wordIndex.value === props.words.length - 1) {
      isFinished.value = true;
      emit('on-finished');
      return;
    }
    nextSpeed = props.pauseDuration;
    isDeleting.value = true;
  } else if (isDeleting.value && charIndex.value === 0) {
    isDeleting.value = false;
    wordIndex.value = (wordIndex.value + 1) % props.words.length;
    nextSpeed = 500;
  }

  timeoutId = window.setTimeout(type, nextSpeed);
}

onMounted(() => {
  type();
});

onUnmounted(() => {
  if (timeoutId) clearTimeout(timeoutId);
});
</script>

<template>
  <div class="inline-flex items-center gap-1">
    <span class="text-inherit">{{ displayText }}</span>
    <span
      class="w-3 h-3 bg-purple-600 rounded-full animate-cursor shadow-[0_0_10px_rgba(147,51,234,0.5)]"
      :style="{ animationDuration: props.blinkSpeed }"
    ></span>
  </div>
</template>

<style scoped>
@keyframes pulse-fast {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.3;
    transform: scale(0.8);
  }
}

.animate-cursor {
  animation: pulse-fast var(--blink-speed, 0.8s) cubic-bezier(0.4, 0, 0.6, 1)
    infinite;
}
</style>
