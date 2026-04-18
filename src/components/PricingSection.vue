<script setup lang="ts">
import { computed, onMounted } from "vue";
import { Check, ArrowRight } from "lucide-vue-next";
import { useServicesStore } from "../stores/services";

const servicesStore = useServicesStore();

const plans = computed(() => {
  if (!servicesStore.data) return [];

  return servicesStore.data.paquetes_implementacion.map(p => {
    // Collect all services
    let features: string[] = [];
    
    // Add base services if they exist
    if (p.servicios) {
      features = p.servicios.map(s => s.nombre);
    }

    // Handle inclusions from previous plans
    if (p.incluye_id) {
      const parentPlan = servicesStore.data?.paquetes_implementacion.find(pl => pl.id === p.incluye_id);
      if (parentPlan) {
        features = [`Todo lo del plan ${parentPlan.nombre}`, ...p.servicios_adicionales?.map(s => s.nombre) || []];
      }
    }

    features.push("Mes 1 de CRM incluido");

    return {
      name: p.nombre,
      description: p.descripcion,
      price: p.precio_setup.toLocaleString(),
      maintenance: servicesStore.data?.configuracion_base.cuota_mensual_mantenimiento.toLocaleString() || "3,200",
      features: features,
      buttonText: `Quiero el ${p.nombre}`,
      isPopular: p.destacado,
    };
  });
});

onMounted(async () => {
  if (!servicesStore.data) {
    await servicesStore.fetchServices();
  }
});
</script>

<template>
  <section id="pricing" class="py-24 px-6 bg-white text-black font-sans">
    <div class="max-w-7xl mx-auto">
      <!-- Section Header aligned like the "Latest Blogs" -->
      <div
        class="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6"
      >
        <div>
          <h2
            class="text-4xl md:text-5xl font-medium tracking-tight mb-4 text-zinc-900"
          >
            Planes de Inversión
          </h2>
          <p class="text-zinc-500 text-lg max-w-xl">
            Soluciones escalables diseñadas para potenciar el crecimiento de tu
            negocio desde el primer día.
          </p>
        </div>
        <router-link
          to="/pricing"
          class="px-6 py-2.5 rounded-full bg-zinc-100 hover:bg-main-purple hover:text-white text-zinc-900 text-sm font-medium transition-all"
        >
          Ver todos los detalles
        </router-link>
      </div>

      <!-- Pricing Grid - Inspired by the Clean Card Style -->
      <div v-if="servicesStore.loading" class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div v-for="i in 3" :key="i" class="bg-zinc-50 rounded-2xl h-[500px] animate-pulse"></div>
      </div>
      
      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div v-for="plan in plans" :key="plan.name" class="flex flex-col group">
          <!-- Card Content -->
          <div class="bg-white rounded-2xl overflow-hidden mb-6 transition-all">
            <!-- Price Display (Large and Clean) -->
            <div class="mb-6">
              <div class="flex items-baseline gap-1">
                <span class="text-xl font-medium text-main-purple">$</span>
                <span
                  class="text-5xl font-semibold tracking-tight text-zinc-900"
                  >{{ plan.price }}</span
                >
              </div>
              <p
                class="text-xs text-zinc-400 mt-2 font-medium uppercase tracking-wider"
              >
                MXN · pago único
              </p>
            </div>

            <h3 class="text-2xl font-semibold text-main-purple mb-2">
              {{ plan.name }}
            </h3>
            <p class="text-zinc-500 text-sm leading-relaxed mb-8 h-12">
              {{ plan.description }}
            </p>

            <!-- Features List -->
            <ul class="space-y-4 mb-8">
              <li
                v-for="feature in plan.features"
                :key="feature"
                class="flex items-start gap-3 group/item"
              >
                <Check
                  class="w-4 h-4 text-main-purple font-extrabold mt-0.5 flex-shrink-0"
                />
                <span class="text-zinc-600 text-sm">
                  {{ feature }}
                </span>
              </li>
            </ul>
          </div>

          <!-- Bottom Action Link (Similar to "Read blog >") -->
          <div class="mt-auto">
            <router-link
              :to="'/configurar/' + plan.name.toLowerCase().replace(/\s+/g, '-')"
              class="inline-flex items-center gap-2 text-sm font-semibold text-zinc-900 hover:gap-3 transition-all group/link"
            >
              {{ plan.buttonText }}
              <ArrowRight
                class="w-4 h-4 transition-transform group-hover/link:translate-x-1 text-main-purple"
              />
            </router-link>
            <p class="text-[10px] text-zinc-400 mt-2">
              Mantenimiento: ${{ plan.maintenance }}/mes
            </p>
          </div>
        </div>
      </div>

      <!-- Carousel dots simulation from the image -->
      <div class="flex justify-center gap-2 mt-16">
        <div class="w-2 h-2 rounded-full bg-zinc-200"></div>
        <div class="w-2 h-2 rounded-full bg-main-purple"></div>
        <div class="w-2 h-2 rounded-full bg-zinc-200"></div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap");

section {
  font-family: "Inter", sans-serif;
}
</style>
