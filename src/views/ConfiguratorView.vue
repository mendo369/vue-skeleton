<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import {
  Bot,
  Star,
  Users,
  RotateCw,
  LineChart,
  Layout,
  Megaphone,
  ArrowLeft,
  Plus,
  MousePointer2,
  Settings,
  Brain,
  Briefcase,
  Zap,
} from "lucide-vue-next";
import Navbar from "../components/shared/Navbar.vue";

const route = useRoute();
const planSlug = computed(() => (route.params.plan as string) || "starter");

const plans: Record<string, any> = {
  starter: {
    name: "Starter",
    price: 25000,
    monthly: 2900,
    includedIds: [],
    description: "Sistema básico listo para operar.",
  },
  growth: {
    name: "Growth",
    price: 34900,
    monthly: 2900,
    includedIds: ["followup-30"],
    description: "Ideal para escalar con seguimiento extendido.",
  },
  "sales-machine": {
    name: "Sales Machine",
    price: 49900,
    monthly: 2900,
    includedIds: ["crm-team", "bot-faq"],
    description: "La solución total para equipos de alto rendimiento.",
  },
};

const basePlan = computed(() => plans[planSlug.value] || plans.starter);

const allAddons = [
  // Setup Items (Upsells)
  {
    id: "tracking-pro",
    name: "Tracking Pro",
    description: "Eventos completos + CAPI para medición perfecta de anuncios.",
    price: 4900,
    type: "setup",
    icon: LineChart,
    category: "Datos",
  },
  {
    id: "followup-30",
    name: "Follow-up Pro 30 días",
    description: "No-show, winback y reactivación de leads antiguos.",
    price: 6900,
    type: "setup",
    icon: RotateCw,
    category: "Automatización",
  },
  {
    id: "bot-faq",
    name: "Bot FAQ + Objeciones",
    description: "IA básica que resuelve dudas recurrentes 24/7.",
    price: 8900,
    type: "setup",
    icon: Bot,
    category: "IA",
  },
  {
    id: "crm-team",
    name: "CRM Team Pack",
    description: "SLA, scripts, asignación, tareas y tablero de control.",
    price: 12900,
    type: "setup",
    icon: Users,
    category: "Equipo",
  },
  {
    id: "reviews",
    name: "Sistema de Reseñas",
    description: "Automatización para captar testimonios reales en Google.",
    price: 6900,
    type: "setup",
    icon: Star,
    category: "Social Proof",
  },
  {
    id: "evergreen",
    name: "Campaña Evergreen",
    description: "Estrategia de pauta de larga duración optimizada.",
    price: 8900,
    type: "setup",
    icon: Megaphone,
    category: "Ads",
  },
  // Monthly Items (Add-ons)
  {
    id: "mantenimiento-plus",
    name: "Mantenimiento Plus",
    description: "2 ajustes técnicos al mes + revisión de métricas mensual.",
    price: 2000,
    type: "monthly",
    icon: Settings,
    category: "Servicio",
  },
  {
    id: "bot-pro",
    name: "Bot Pro Mensual",
    description: "Mejora continua y optimización mensual del flujo de IA.",
    price: 2500,
    type: "monthly",
    icon: Brain,
    category: "IA",
  },
  {
    id: "ads-full",
    name: "Ads Full Management",
    description: "Gestión completa de Meta/Google Ads (No incluye inversión).",
    price: 12000,
    type: "monthly",
    icon: Layout,
    category: "Ads",
  },
  {
    id: "director-marketing",
    name: "Director de Marketing",
    description:
      "Estrategia integral + roadmap + juntas + métricas (Cupos limitados).",
    price: 20000,
    type: "monthly",
    icon: Briefcase,
    category: "Estratégico",
  },
];

const selectedAddons = ref<any[]>([]);
const draggedItem = ref<any>(null);
const isHoveringPlan = ref(false);

const addons = computed(() => {
  return allAddons.filter(
    (a) =>
      !basePlan.value.includedIds.includes(a.id) &&
      !selectedAddons.value.find((s) => s.id === a.id),
  );
});

const onDragStart = (item: any) => {
  draggedItem.value = item;
};

const addAddon = (item: any) => {
  if (!selectedAddons.value.find((a) => a.id === item.id)) {
    selectedAddons.value.push(item);
  }
};

const onDrop = () => {
  if (draggedItem.value) {
    addAddon(draggedItem.value);
  }
  isHoveringPlan.value = false;
  draggedItem.value = null;
};

const removeAddon = (item: any) => {
  selectedAddons.value = selectedAddons.value.filter((a) => a.id !== item.id);
};

const setupSubtotal = computed(() => {
  return (
    basePlan.value.price +
    selectedAddons.value
      .filter((a) => a.type === "setup")
      .reduce((sum, a) => sum + a.price, 0)
  );
});

const discount = computed(() => {
  // Descuento del 10% si se eligen 4 o más items adicionales (setup)
  const setupItems = selectedAddons.value.filter((a) => a.type === "setup");
  if (setupItems.length >= 4) {
    return setupSubtotal.value * 0.1;
  }
  return 0;
});

const setupTotal = computed(() => setupSubtotal.value - discount.value);

const monthlyTotal = computed(() => {
  return (
    basePlan.value.monthly +
    selectedAddons.value
      .filter((a) => a.type === "monthly")
      .reduce((sum, a) => sum + a.price, 0)
  );
});

onMounted(() => {
  window.scrollTo(0, 0);
});

const goToBooking = () => {
  // CONFIGURACIÓN DE GOHIGHLEVEL
  // Reemplaza esta URL con tu link real de calendario de GHL
  const GHL_CALENDAR_URL =
    "https://api.leadconnectorhq.com/widget/booking/MqI8e5PSMohAg8V3vmby";

  const params = new URLSearchParams();

  // 1. Información del Plan Base
  params.append("plan_seleccionado", basePlan.value.name);

  // 2. Totales de Inversión
  params.append("setup_total", setupTotal.value.toString());
  params.append("mantenimiento_mensual", monthlyTotal.value.toString());

  // 3. Upsells Seleccionados (Lista separada por comas)
  const upsellsList = selectedAddons.value.map((a) => a.name).join(", ");

  if (upsellsList) {
    params.append("upsells_adicionales", upsellsList);
  }

  // 4. Información de Descuento (opcional)
  if (discount.value > 0) {
    params.append("descuento_aplicado", discount.value.toString());
  }

  // Redirigir a GHL con los parámetros
  window.location.href = `${GHL_CALENDAR_URL}?${params.toString()}`;
};
</script>

<template>
  <div class="min-h-screen bg-white text-zinc-900 font-sans pb-20">
    <Navbar />

    <main class="max-w-7xl mx-auto px-6 pt-24">
      <!-- Header -->
      <div class="mb-12">
        <router-link
          to="/"
          class="inline-flex items-center gap-2 text-zinc-400 hover:text-zinc-900 mb-8 transition-colors group"
        >
          <ArrowLeft
            class="w-4 h-4 group-hover:-translate-x-1 transition-transform"
          />
          Volver al inicio
        </router-link>

        <h1 class="text-4xl md:text-6xl font-black text-zinc-900 mb-4">
          Configura tu Plan {{ basePlan.name }}
        </h1>
        <p class="text-zinc-500 text-lg max-w-2xl">
          Personaliza tu sistema arrastrando las capacidades adicionales que tu
          negocio necesita hoy.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <!-- Available Addons -->
        <div class="lg:col-span-4 space-y-6">
          <div class="flex items-center justify-between mb-4">
            <h2
              class="text-xs font-bold uppercase tracking-widest text-zinc-400"
            >
              Capacidades Disponibles
            </h2>
            <span
              class="text-[10px] px-2 py-0.5 bg-zinc-100 rounded text-zinc-500"
              >{{ addons.length }} restantes</span
            >
          </div>

          <div class="space-y-4">
            <div
              v-for="addon in addons"
              :key="addon.id"
              draggable="true"
              @dragstart="onDragStart(addon)"
              class="group bg-white border border-zinc-100 p-5 rounded-2xl hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/5 transition-all cursor-grab active:cursor-grabbing relative overflow-hidden"
            >
              <!-- Icon and Title -->
              <div class="flex items-start gap-4 mb-3">
                <div
                  class="p-2.5 rounded-xl bg-zinc-50 group-hover:bg-purple-50 transition-colors"
                >
                  <component
                    :is="addon.icon"
                    class="w-5 h-5 text-zinc-900 group-hover:text-purple-600 transition-colors"
                  />
                </div>
                <div>
                  <h3 class="font-bold text-sm text-zinc-900">
                    {{ addon.name }}
                  </h3>
                  <span
                    class="text-[10px] font-bold text-main-purple uppercase"
                    >{{ addon.category }}</span
                  >
                </div>
              </div>
              <p class="text-xs text-zinc-500 leading-relaxed">
                {{ addon.description }}
              </p>

              <!-- Drag Indicator (Desktop Only) -->
              <div
                class="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity hidden lg:block"
              >
                <MousePointer2 class="w-4 h-4 text-purple-400 animate-bounce" />
              </div>

              <!-- Mobile Add Button -->
              <button
                @click="addAddon(addon)"
                class="lg:hidden mt-4 w-full py-3 bg-zinc-900 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform"
              >
                <Plus :size="14" /> Añadir capacidad
              </button>
            </div>
          </div>

          <div
            v-if="addons.length === 0"
            class="p-10 text-center border-2 border-dashed border-zinc-100 rounded-3xl"
          >
            <p class="text-zinc-400 text-sm">
              Has añadido todas las capacidades al plan.
            </p>
          </div>
        </div>

        <!-- Drop Zone / Plan Summary -->
        <div class="lg:col-span-8">
          <div
            class="sticky top-24 transition-all duration-500"
            @dragover.prevent="isHoveringPlan = true"
            @dragleave="isHoveringPlan = false"
            @drop="onDrop"
          >
            <div
              :class="[
                'min-height-[600px] rounded-[40px] p-8 md:p-12 border transition-all duration-500 overflow-hidden relative',
                isHoveringPlan
                  ? 'bg-purple-50 border-purple-500 border-dashed scale-[1.02]'
                  : 'bg-zinc-50 border-zinc-200 shadow-2xl shadow-zinc-200/50',
              ]"
            >
              <!-- Background Accent -->
              <div
                class="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 blur-[100px] -z-10"
              ></div>

              <div
                class="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6"
              >
                <div>
                  <span
                    class="text-[10px] font-bold uppercase tracking-widest text-purple-500 mb-1 block"
                    >Resumen del Sistema</span
                  >
                  <h2 class="text-4xl font-black">Plan {{ basePlan.name }}</h2>
                  <p class="text-zinc-400 text-xs mt-1">
                    Configuración personalizada
                  </p>
                </div>
                <div class="flex flex-col md:flex-row gap-8">
                  <div class="text-left md:text-right">
                    <p
                      class="text-[10px] font-bold text-zinc-400 uppercase mb-1"
                    >
                      Inversión Setup (Única)
                    </p>
                    <p
                      class="text-3xl font-bold font-mono tracking-tighter text-zinc-900"
                    >
                      ${{ setupTotal.toLocaleString() }}
                      <span class="text-[10px] font-medium text-zinc-400"
                        >MXN</span
                      >
                    </p>
                  </div>
                  <div class="text-left md:text-right">
                    <p
                      class="text-[10px] font-bold text-zinc-400 uppercase mb-1"
                    >
                      Mantenimiento (Mensual)
                    </p>
                    <p
                      class="text-3xl font-bold font-mono tracking-tighter text-main-purple"
                    >
                      ${{ monthlyTotal.toLocaleString() }}
                      <span class="text-[10px] font-medium text-zinc-400"
                        >/mes</span
                      >
                    </p>
                  </div>
                </div>
              </div>

              <!-- Discount Banner -->
              <div
                v-if="discount > 0"
                class="mb-8 p-4 bg-green-50 rounded-2xl border border-green-100 flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-500"
              >
                <div class="p-2 bg-green-500 rounded-lg">
                  <Zap class="w-4 h-4 text-white" />
                </div>
                <div>
                  <p class="text-sm font-bold text-green-800">
                    ¡Descuento por Pack Aplicado!
                  </p>
                  <p class="text-xs text-green-600">
                    Se ha aplicado un 10% de descuento por volumen en tu setup
                    (-${{ discount.toLocaleString() }} MXN).
                  </p>
                </div>
              </div>

              <!-- Added Addons Container -->
              <div class="space-y-4 mb-12">
                <div
                  v-if="selectedAddons.length === 0"
                  class="py-20 flex flex-col items-center justify-center text-center"
                >
                  <div
                    class="w-20 h-20 rounded-full border-2 border-dashed border-zinc-200 flex items-center justify-center mb-6"
                  >
                    <Plus class="w-8 h-8 text-zinc-300" />
                  </div>
                  <h3 class="text-xl font-bold mb-2">Plan Base Vacío</h3>
                  <p class="text-zinc-400 text-sm max-w-xs">
                    Arranque el sistema base y arrastre capacidades aquí para
                    personalizarlo a su medida.
                  </p>
                </div>

                <transition-group
                  name="list"
                  tag="div"
                  class="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  <div
                    v-for="addon in selectedAddons"
                    :key="addon.id"
                    class="bg-white p-6 rounded-3xl border border-zinc-100 shadow-sm flex items-start justify-between group"
                  >
                    <div class="flex items-start gap-4">
                      <div class="p-3 rounded-2xl bg-purple-50 text-purple-600">
                        <component :is="addon.icon" class="w-6 h-6" />
                      </div>
                      <div>
                        <h4 class="font-bold text-zinc-900 mb-0.5 text-sm">
                          {{ addon.name }}
                        </h4>
                        <div class="flex items-center gap-2 mb-1">
                          <span
                            class="text-[10px] font-bold text-purple-600 uppercase"
                            >{{
                              addon.type === "setup" ? "Setup" : "Mensual"
                            }}</span
                          >
                          <span class="text-[10px] font-mono text-zinc-400"
                            >${{ addon.price.toLocaleString() }}</span
                          >
                        </div>
                        <p class="text-[10px] text-zinc-500 leading-tight">
                          {{ addon.description }}
                        </p>
                      </div>
                    </div>
                    <button
                      @click="removeAddon(addon)"
                      class="text-zinc-300 hover:text-red-500 p-2 transition-colors"
                    >
                      ×
                    </button>
                  </div>
                </transition-group>
              </div>

              <!-- CTA -->
              <div
                class="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-zinc-200 gap-8"
              >
                <div class="flex items-center gap-3">
                  <div class="flex -space-x-3">
                    <div
                      v-for="i in 3"
                      :key="i"
                      class="w-8 h-8 rounded-full border-2 border-zinc-50 bg-zinc-200 flex items-center justify-center text-[10px] font-bold"
                    >
                      {{ i }}
                    </div>
                  </div>
                  <p class="text-xs text-zinc-500">
                    <span class="font-bold text-zinc-900">{{
                      selectedAddons.length
                    }}</span>
                    capacidades añadidas al núcleo de {{ basePlan.name }}.
                  </p>
                </div>

                <button
                  @click="goToBooking"
                  class="w-full md:w-auto px-10 py-5 bg-main-purple text-white rounded-2xl font-bold text-lg transition-all shadow-xl shadow-zinc-900/10 hover:scale-[1.02] active:scale-95"
                >
                  Agendar Llamada de Estrategia
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap");

div {
  font-family: "Inter", sans-serif;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px) scale(0.9);
}

.min-height-\[600px\] {
  min-height: 600px;
}
</style>
