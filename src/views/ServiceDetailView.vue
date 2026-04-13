<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed, onMounted } from "vue";
import {
  ArrowLeft,
  CheckCircle2,
  Lightbulb,
  Target,
  TrendingUp,
} from "lucide-vue-next";
import Navbar from "../components/shared/Navbar.vue";

const route = useRoute();
const slug = computed(() => route.params.slug as string);

interface ServiceInfo {
  title: string;
  description: string;
  fullDefinition: string;
  icon: any;
  cases: string[];
  application: string;
}

const servicesData: Record<string, ServiceInfo> = {
  "estrategia-direccion": {
    title: "Estrategia & Dirección",
    description:
      "La brújula de tu negocio. Nos encargamos de alinear tus objetivos comerciales con una ejecución táctica impecable, asegurando que cada paso contribuya al crecimiento real.",
    fullDefinition:
      "La Estrategia & Dirección en Simetrik no se trata solo de planificar; se trata de orquestar. Analizamos el mercado, identificamos cuellos de botella en tu operación actual y diseñamos una hoja de ruta clara que conecta el marketing con las ventas y la rentabilidad.",
    icon: Target,
    cases: [
      "Rediseño de modelos de negocio tradicionales hacia ecosistemas digitales escalables.",
      "Optimización de la cadena de valor para maximizar el margen de beneficio por cliente.",
      "Planificación de expansión táctica en mercados competitivos con inversión optimizada.",
    ],
    application:
      "Ideal para empresas que sienten que están estancadas o que crecen de forma desordenada sin una visión clara de sus métricas.",
  },
  "campanas-automatizaciones": {
    title: "Campañas & Automatizaciones",
    description:
      "Transformamos procesos manuales en motores de venta automáticos. Captamos leads y los nutrimos sin intervención humana persistente.",
    fullDefinition:
      "Diseñamos flujos de trabajo inteligentes que trabajan 24/7. Desde el primer clic de un anuncio hasta el cierre de una venta, automatizamos cada punto de contacto para que tu equipo se enfoque en lo que realmente importa: cerrar negocios.",
    icon: Lightbulb,
    cases: [
      "Sistemas de nutrición de prospectos (Lead Nurturing) que aumentan la confianza del cliente automáticamente.",
      'Automatización de recordatorios de citas y seguimientos para reducir el "no-show" en un 40%.',
      "Integración de CRM con herramientas de marketing para una trazabilidad total del cliente.",
    ],
    application:
      "Perfecto para negocios que pierden leads por falta de seguimiento o que invierten demasiado tiempo en tareas repetitivas.",
  },
  "growth-funnels": {
    title: "Growth & Funnels",
    description:
      "Optimización obsesiva del embudo de conversión. No solo atraemos tráfico, lo convertimos en clientes recurrentes y promotores de marca.",
    fullDefinition:
      "El Growth & Funnels es la ciencia de la experimentación. Analizamos cada etapa de tu embudo (Atracción, Activación, Retención, Referencia e Ingreso) para encontrar las palancas de crecimiento más potentes y escalarlas rápido.",
    icon: TrendingUp,
    cases: [
      "Optimización de landing pages de alta conversión con tasas superiores al benchmark del sector.",
      "Diseño de funnels de ventas multi-etapa que incrementan el valor de vida del cliente (LTV).",
      "Implementación de estrategias de referral que convierten a tus clientes actuales en tu mejor fuerza de ventas.",
    ],
    application:
      "Diseñado para empresas que ya tienen tracción pero necesitan optimizar sus costos de adquisición y maximizar el retorno de inversión.",
  },
  "frontend-experiencia": {
    title: "Frontend & Experiencia",
    description:
      "Interfaces que no solo son hermosas, sino que están diseñadas para convertir. Creamos experiencias digitales rápidas, intuitivas y fluidas.",
    fullDefinition:
      "La experiencia del usuario es el factor determinante en la decisión de compra moderna. Construimos plataformas frontend que eliminan la fricción, cargan en milisegundos y guían al usuario naturalmente hacia la acción deseada.",
    icon: CheckCircle2,
    cases: [
      "Desarrollo de Progressive Web Apps (PWA) que ofrecen una experiencia móvil nativa sin fricción de descarga.",
      "Interfaces de usuario (UI) adaptativas que mantienen la consistencia de marca en cualquier dispositivo.",
      "Optimización de tiempos de carga críticos (Core Web Vitals) para mejorar el posicionamiento SEO y la retención.",
    ],
    application:
      "Esencial para marcas que buscan diferenciarse mediante la calidad visual y la facilidad de uso de sus plataformas digitales.",
  },
};

const service = computed(
  () =>
    (servicesData[slug.value] ||
      servicesData["estrategia-direccion"]) as ServiceInfo,
);

onMounted(() => {
  window.scrollTo(0, 0);
});
</script>

<template>
  <div class="min-h-screen bg-white text-zinc-900 font-sans">
    <Navbar />

    <main class="pt-24 pb-20">
      <div class="max-w-5xl mx-auto px-6">
        <!-- Back Link -->
        <router-link
          to="/"
          class="inline-flex items-center gap-2 text-zinc-400 hover:text-zinc-900 transition-colors mb-12 group"
        >
          <ArrowLeft
            class="w-4 h-4 group-hover:-translate-x-1 transition-transform"
          />
          Volver al inicio
        </router-link>

        <!-- Header -->
        <div class="flex items-center gap-4 mb-6">
          <div class="p-3 rounded-2xl bg-zinc-100 text-zinc-900">
            <component :is="service.icon" class="w-8 h-8" />
          </div>
          <span
            class="text-sm font-bold uppercase tracking-widest text-main-purple"
            >Área de Trabajo</span
          >
        </div>

        <h1
          class="text-5xl md:text-7xl font-bold tracking-tight mb-8 text-zinc-900"
        >
          {{ service.title }}
        </h1>

        <p class="text-2xl text-zinc-600 leading-relaxed mb-16 max-w-3xl">
          {{ service.description }}
        </p>

        <!-- Detail Grid -->
        <div
          class="grid grid-cols-1 md:grid-cols-3 gap-16 py-16 border-t border-zinc-100"
        >
          <div class="md:col-span-2">
            <h2 class="text-2xl font-bold mb-6">Definición Estratégica</h2>
            <p class="text-zinc-500 text-lg leading-relaxed mb-10">
              {{ service.fullDefinition }}
            </p>

            <h2 class="text-2xl font-bold mb-8">Casos de Aplicación</h2>
            <div class="space-y-6">
              <div
                v-for="(c, index) in service.cases"
                :key="index"
                class="flex gap-4 p-6 rounded-2xl bg-zinc-50 border border-zinc-100 items-start"
              >
                <div
                  class="flex-shrink-0 w-8 h-8 rounded-full bg-main-purple border flex items-center justify-center text-sm font-bold text-white"
                >
                  {{ index + 1 }}
                </div>
                <p class="text-zinc-600 leading-relaxed">{{ c }}</p>
              </div>
            </div>
          </div>

          <div class="space-y-12">
            <div>
              <h3
                class="text-sm font-bold uppercase tracking-widest text-main-purple mb-4"
              >
                ¿Para quién es esto?
              </h3>
              <p class="text-zinc-600 text-sm leading-relaxed">
                {{ service.application }}
              </p>
            </div>

            <div class="p-8 rounded-3xl bg-main-purple text-white">
              <h3 class="text-xl font-bold mb-4">Empecemos hoy</h3>
              <p class="text-white text-sm mb-6 leading-relaxed">
                Integra esta área a tu empresa y comienza a ver resultados en
                los primeros 10 días.
              </p>
              <router-link
                to="/pricing"
                class="block w-full py-3 px-6 bg-white text-black text-center rounded-xl font-bold text-sm hover:scale-[1.02] transition-transform"
              >
                Ver Planes
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap");
</style>
