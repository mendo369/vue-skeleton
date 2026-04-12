<script setup lang="ts">
import About from "./components/About.vue";
import Hero from "./components/Hero.vue";
import Navbar from "./components/shared/Navbar.vue";
import Features from "./components/Features.vue";
import VideoWelcome from "./components/VideoWelcome.vue";
import TeamCarousel from "./components/TeamCarousel.vue";

const team = [
  {
    name: "Rafael Benavides",
    role: "Líder & Estrategia",
    description:
      "Visión del producto, estrategia de crecimiento y dirección del equipo. El que conecta todos los puntos y mantiene el rumbo.",
    emoji: "👨‍💼",
    viewLink: "#",
  },
  {
    name: "Manuel Cardona",
    role: "Campañas & Automatizaciones",
    description:
      "Diseña los flujos de captación, nutre leads y automatiza todo el recorrido del cliente desde el primer clic hasta la compra.",
    emoji: "📣",
    viewLink: "#",
  },
  {
    name: "Nicolás",
    role: "Growth & Funnels",
    description:
      "Optimiza cada paso del embudo de ventas para maximizar la conversión, reducir fricción y escalar lo que ya funciona.",
    emoji: "🎯",
    viewLink: "#",
  },
  {
    name: "Luis Mendoza",
    role: "Frontend Developer",
    description:
      "Interfaces rápidas, limpias y que convierten. Transforma diseño en experiencias que los usuarios aman usar.",
    emoji: "👨‍💻",
    viewLink: "#",
  },
];
</script>

<template>
  <Navbar />
  <Hero />
  <VideoWelcome />
  <About />
  <Features />
  <TeamCarousel
    :members="team"
    section-title="Un equipo construido por personas,&#10;Para personas reales"
    section-description="Simetrik es un equipo pequeño y enfocado. Cada quien domina su área y juntos cubren todo el ciclo: desde captar la atención hasta cerrar y retener al cliente."
    :typing-speed="75"
  />
</template>
