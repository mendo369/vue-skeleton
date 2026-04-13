<script setup lang="ts">
import About from "../components/About.vue";
import Hero from "../components/Hero.vue";
import Navbar from "../components/shared/Navbar.vue";
import Features from "../components/Features.vue";
import VideoWelcome from "../components/VideoWelcome.vue";
import TeamCarousel from "../components/TeamCarousel.vue";
import PricingSection from "../components/PricingSection.vue";
import Footer from "../components/shared/Footer.vue";

const services = [
  {
    name: "Estrategia & Dirección",
    role: "Liderazgo Estratégico",
    description:
      "Alineamos tu visión de negocio con tácticas digitales que generan rentabilidad y crecimiento sostenible.",
    emoji: "🎯",
    viewLink: "/servicios/estrategia-direccion",
  },
  {
    name: "Campañas & Automatizaciones",
    role: "Marketing Inteligente",
    description:
      "Creamos máquinas de ventas automáticas que captan, nutren y cierran prospectos sin descanso.",
    emoji: "⚙️",
    viewLink: "/servicios/campanas-automatizaciones",
  },
  {
    name: "Growth & Funnels",
    role: "Escalabilidad & Conversión",
    description:
      "Optimizamos cada centímetro de tu embudo para maximizar el retorno de inversión y el valor del cliente.",
    emoji: "🚀",
    viewLink: "/servicios/growth-funnels",
  },
  {
    name: "Frontend & Experiencia",
    role: "Interfaces de Alto Impacto",
    description:
      "Desarrollamos experiencias digitales que cautivan y convierten usuarios en clientes leales.",
    emoji: "✨",
    viewLink: "/servicios/frontend-experiencia",
  },
];
</script>

<template>
  <div class="bg-white min-h-screen">
    <Navbar />
    <Hero />
    <VideoWelcome />
    <About />
    <Features />
    <PricingSection />
    <TeamCarousel
      :members="services"
      section-title="Áreas de especialidad&#10;diseñadas para escalar"
      section-description="No trabajamos de forma aislada. Nuestras cuatro áreas se integran para cubrir cada etapa del viaje de tu cliente, desde el descubrimiento hasta la recomendación."
      :typing-speed="75"
    />
    <Footer />
  </div>
</template>
