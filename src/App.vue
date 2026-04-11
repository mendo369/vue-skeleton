<script setup lang="ts">
import Hero from "./components/Hero.vue";
import Navbar from "./components/shared/Navbar.vue";
import VideoWelcome from "./components/VideoWelcome.vue";

const dockItems = [
  { id: "back", icon: "←", label: "Atrás" },
  { id: "forward", icon: "→", label: "Adelante" },
  { id: "sparkle", icon: "✦", label: "AI" },
  { id: "code", icon: "⟨⟩", label: "Código" },
  { id: "nodes", icon: "⌥", label: "Nodos" },
  { id: "grid", icon: "⊞", label: "Grid" },
  { id: "cube", icon: "⬡", label: "Cubo" },
  { id: "star", icon: "★", label: "Favorito" },
  { id: "check", icon: "✓", label: "Verificar" },
  { id: "tag", icon: "<>", label: "HTML" },
  { id: "terminal", icon: "▶_", label: "Terminal" },
  { id: "sync", icon: "⇄", label: "Sincronizar" },
  { id: "folder", icon: "□", label: "Carpeta" },
  { id: "edit", icon: "✎", label: "Editar" },
  { id: "search", icon: "⌕", label: "Buscar" },
  { id: "refresh", icon: "↺", label: "Refrescar" },
  { id: "copy", icon: "⎘", label: "Copiar" },
  { id: "more", icon: "⋯", label: "Más" },
];
</script>

<template>
  <Navbar />
  <Hero />
  <VideoWelcome />
  <!-- <ParticleCursorFollow class="h-screen bg-white">
    <div class="flex flex-col items-center justify-center h-full gap-16">
      <h1
        class="text-4xl font-bold text-center text-gray-900 pointer-events-none select-none"
      >
        Mueve el ratón ✦
      </h1>

      <IconDock
        :items="dockItems"
        :item-size="48"
        :wave-amplitude="14"
        :wave-speed="0.055"
        :wave-spread="0.45"
      />
    </div>
  </ParticleCursorFollow> -->
</template>
