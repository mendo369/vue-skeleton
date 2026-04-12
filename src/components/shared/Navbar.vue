<script setup lang="ts">
import { Boxes } from "lucide-vue-next";
</script>

<template>
  <nav
    class="shadow-sm w-full px-4 md:px-[10em] py-3 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-50"
  >
    <div class="flex gap-8 items-center">
      <div class="text-xl font-black tracking-tighter">Simetri-K</div>
      <!-- Ocultos en móvil -->
      <div class="hidden md:flex gap-6 items-center">
        <div class="text-main-gray hover:text-black cursor-pointer transition-colors font-medium">Inicio</div>
        <div class="text-main-gray hover:text-black cursor-pointer transition-colors font-medium">Casos de Uso</div>
        <div class="text-main-gray hover:text-black cursor-pointer transition-colors font-medium">Servicios</div>
        <div class="text-main-gray hover:text-black cursor-pointer transition-colors font-medium">Contacto</div>
      </div>
    </div>
    <div class="flex items-center bg-black px-4 md:px-6 py-2 rounded-full hover:scale-105 transition-transform cursor-pointer">
      <div class="text-white text-sm md:text-base flex items-center gap-2 font-bold">
        <Boxes :size="18" /> <span class="hidden sm:inline">Obtener Ahora</span><span class="sm:hidden">Empezar</span>
      </div>
    </div>
  </nav>

</template>

<style scoped></style>
