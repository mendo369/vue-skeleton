<script lang="ts" setup>
import { ref } from "vue";
import { CalendarClock, SquareChevronDown, ToolCase } from "lucide-vue-next";
import ParticleCursorFollow from "./shared/ParticleCursorFollow.vue";
import Typewriter from "./shared/Typewriter.vue";

const showContent = ref(false);
</script>

<template>
  <ParticleCursorFollow class="flex justify-center min-h-[90vh]">
    <section
      class="flex flex-col w-full justify-center items-center py-20 px-4"
    >
      <div class="mb-12">
        <img
          src="../assets/simetrik.png"
          alt="Simetri-K"
          class="w-[12em] md:w-[15em]"
        />
      </div>
      <div
        class="text-4xl md:text-[5em] leading-tight text-center font-bold mb-8"
      >
        <Typewriter
          :words="['Escala sin caos. Vende sin límites.']"
          :loop="false"
          :typing-speed="60"
          :blink-speed="'0.8s'"
          @on-finished="showContent = true"
        />
      </div>
      <div 
        class="max-w-2xl text-center transition-all duration-1000 transform"
        :class="showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
      >
        <p class="text-xl text-main-gray/80">
          Transformamos tu operación de e-commerce con IA y automatización.
          Convierte clicks en clientes.
        </p>
      </div>
      <div 
        class="flex flex-wrap justify-center gap-5 mt-16 transition-all duration-1000 delay-300 transform"
        :class="showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
      >
        <div
          class="flex gap-5 items-center bg-black px-8 py-4 rounded-full hover:bg-black/90 cursor-pointer transition-all shadow-lg hover:shadow-black/20"
        >
          <div class="text-white text-lg flex gap-2 items-center font-medium">
            <CalendarClock /> Agendar Consultoría
          </div>
        </div>
        <div
          class="flex gap-5 items-center bg-transparent px-8 py-4 rounded-full border-main-gray border hover:bg-main-gray/5 cursor-pointer transition-all"
        >
          <div
            class="text-main-gray text-lg flex gap-2 items-center font-medium"
          >
            <ToolCase></ToolCase> Casos de Uso
          </div>
        </div>
      </div>
    </section>
  </ParticleCursorFollow>
</template>

<style></style>
