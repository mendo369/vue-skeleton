<script setup lang="ts">
import PricingSection from "../components/PricingSection.vue";
import { ArrowLeft } from "lucide-vue-next";
import Navbar from "../components/shared/Navbar.vue";
import { onMounted } from "vue";

onMounted(() => {
  window.scrollTo(0, 0);
});
</script>

<template>
  <div class="min-h-screen bg-white text-zinc-900 font-sans">
    <Navbar />
    
    <main class="pt-24 pb-20">
      <div class="max-w-7xl mx-auto px-6 mb-16">
        <router-link 
          to="/" 
          class="inline-flex items-center gap-2 text-zinc-400 hover:text-zinc-900 transition-colors mb-8 group"
        >
          <ArrowLeft class="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Volver al inicio
        </router-link>

        <h1 class="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-zinc-900">
          Nuestros Planes
        </h1>
        <p class="text-zinc-500 text-xl max-w-2xl leading-relaxed">
          Transparencia total. Elige el plan que mejor se adapte a tus necesidades de crecimiento.
        </p>
      </div>

      <PricingSection />

      <!-- FAQ Section - Clean and minimalist -->
      <section class="max-w-4xl mx-auto px-6 mt-32">
        <h2 class="text-3xl font-bold mb-12 text-zinc-900">Preguntas comunes</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 border-t border-zinc-100 pt-12">
          <div>
            <h3 class="text-lg font-semibold mb-3 text-zinc-900">¿Qué incluye el mantenimiento?</h3>
            <p class="text-zinc-500 text-sm leading-relaxed">Soporte técnico, actualizaciones constantes de seguridad, hosting de alta velocidad y acceso ilimitado a Simetrikapp.</p>
          </div>
          <div>
            <h3 class="text-lg font-semibold mb-3 text-zinc-900">¿Puedo escalar mi plan?</h3>
            <p class="text-zinc-500 text-sm leading-relaxed">Totalmente. Puedes subir de nivel en cualquier momento pagando solo la diferencia del valor base del plan anterior.</p>
          </div>
          <div>
            <h3 class="text-lg font-semibold mb-3 text-zinc-900">¿Hay cargos ocultos?</h3>
            <p class="text-zinc-500 text-sm leading-relaxed">No. El pago es único para la implementación de tu sistema y la cuota de mantenimiento es fija mensual.</p>
          </div>
          <div>
            <h3 class="text-lg font-semibold mb-3 text-zinc-900">¿Cuánto tarda la entrega?</h3>
            <p class="text-zinc-500 text-sm leading-relaxed">Garantizamos la entrega de tu sistema base configurado en un plazo de 7 a 10 días hábiles.</p>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
</style>
