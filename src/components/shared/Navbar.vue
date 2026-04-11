<script setup lang="ts">
import { Boxes, User2 } from "lucide-vue-next";
</script>

<template>
  <nav
    class="shadow-sm w-full px-[10em] py-2 flex items-center justify-between"
  >
    <div class="flex gap-5 items-center">
      <div class="text-lg font-bold mr-5">Simetri-K</div>
      <div class="text-main-gray text-lg">Inicio</div>
      <div class="text-main-gray text-lg">Casos de Uso</div>
      <div class="text-main-gray text-lg">Servicios</div>
      <div class="text-main-gray text-lg">Contacto</div>
    </div>
    <div class="flex gap-5 items-center bg-black px-5 py-2 rounded-full">
      <div class="text-white text-lg flex items-center gap-2">
        <Boxes /> Obtener Ahora
      </div>
    </div>
  </nav>
</template>

<style scoped></style>
