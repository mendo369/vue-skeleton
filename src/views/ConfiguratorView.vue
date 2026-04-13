<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { 
  Bot, Calendar, Star, Users, RotateCw, LineChart, 
  Layout, Megaphone, ArrowLeft, Plus, Check, Info, MousePointer2
} from 'lucide-vue-next';
import Navbar from '../components/shared/Navbar.vue';

const route = useRoute();
const planSlug = computed(() => route.params.plan as string);

const plans = {
  'starter': { name: 'Starter', price: 25000 },
  'growth': { name: 'Growth', price: 34900 },
  'sales-machine': { name: 'Sales Machine', price: 49900 }
};

const basePlan = computed(() => plans[planSlug.value as keyof typeof plans] || plans.starter);

const addons = ref([
  { 
    id: 1, 
    name: 'Bot de FAQ y objeciones', 
    description: 'Responde las preguntas más comunes automáticamente y filtra a los prospectos listos.',
    icon: Bot,
    category: 'IA & Soporte'
  },
  { 
    id: 2, 
    name: 'Calendario de agendamiento', 
    description: 'Tus prospectos agendan directamente sin llamadas de coordinación. El sistema lo gestiona solo.',
    icon: Calendar,
    category: 'Ventas'
  },
  { 
    id: 3, 
    name: 'Sistema de reseñas', 
    description: 'Solicita reseñas automáticamente a tus clientes satisfechos y construye reputación.',
    icon: Star,
    category: 'Confianza'
  },
  { 
    id: 4, 
    name: 'CRM para equipos', 
    description: 'Asignación de leads, scripts de venta, tablero de seguimiento y SLAs.',
    icon: Users,
    category: 'Gestión'
  },
  { 
    id: 5, 
    name: 'Winback y reactivación', 
    description: 'Secuencias automáticas para recuperar prospectos que no respondieron.',
    icon: RotateCw,
    category: 'Recuperación'
  },
  { 
    id: 6, 
    name: 'Tracking avanzado', 
    description: 'Eventos completos, CAPI y atribución real para medir conversión exacta.',
    icon: LineChart,
    category: 'Datos'
  },
  { 
    id: 7, 
    name: 'Landing page premium', 
    description: 'Tu página diseñada para convertir desde el primer día. Sin templates genéricos.',
    icon: Layout,
    category: 'Diseño'
  },
  { 
    id: 8, 
    name: 'Campañas evergreen', 
    description: 'Anuncios que funcionan todo el año sin necesidad de contenido nuevo constante.',
    icon: Megaphone,
    category: 'Ads'
  }
]);

const selectedAddons = ref<any[]>([]);
const draggedItem = ref<any>(null);
const isHoveringPlan = ref(false);

const onDragStart = (item: any) => {
  draggedItem.value = item;
};

const onDrop = () => {
  if (draggedItem.value && !selectedAddons.value.find(a => a.id === draggedItem.value.id)) {
    selectedAddons.value.push(draggedItem.value);
    // Remove from available
    addons.value = addons.value.filter(a => a.id !== draggedItem.value.id);
  }
  isHoveringPlan.value = false;
  draggedItem.value = null;
};

const removeAddon = (item: any) => {
  selectedAddons.value = selectedAddons.value.filter(a => a.id !== item.id);
  addons.value.push(item);
};

onMounted(() => {
  window.scrollTo(0, 0);
});
</script>

<template>
  <div class="min-h-screen bg-white text-zinc-900 font-sans pb-20">
    <Navbar />

    <main class="max-w-7xl mx-auto px-6 pt-24">
      <!-- Header -->
      <div class="mb-12">
        <router-link to="/" class="inline-flex items-center gap-2 text-zinc-400 hover:text-zinc-900 mb-8 transition-colors group">
          <ArrowLeft class="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Volver al inicio
        </router-link>
        
        <h1 class="text-4xl md:text-6xl font-black italic tracking-tighter text-zinc-900 mb-4">
          Configura tu Plan {{ basePlan.name }}
        </h1>
        <p class="text-zinc-500 text-lg max-w-2xl">
          Personaliza tu sistema arrastrando las capacidades adicionales que tu negocio necesita hoy.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        <!-- Available Addons -->
        <div class="lg:col-span-4 space-y-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xs font-bold uppercase tracking-widest text-zinc-400">Capacidades Disponibles</h2>
            <span class="text-[10px] px-2 py-0.5 bg-zinc-100 rounded text-zinc-500">{{ addons.length }} restantes</span>
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
                <div class="p-2.5 rounded-xl bg-zinc-50 group-hover:bg-purple-50 transition-colors">
                  <component :is="addon.icon" class="w-5 h-5 text-zinc-900 group-hover:text-purple-600 transition-colors" />
                </div>
                <div>
                  <h3 class="font-bold text-sm text-zinc-900">{{ addon.name }}</h3>
                  <span class="text-[10px] font-bold text-purple-600 uppercase">{{ addon.category }}</span>
                </div>
              </div>
              <p class="text-xs text-zinc-500 leading-relaxed">
                {{ addon.description }}
              </p>
              
              <!-- Drag Indicator -->
              <div class="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                <MousePointer2 class="w-4 h-4 text-purple-400 animate-bounce" />
              </div>
            </div>
          </div>

          <div v-if="addons.length === 0" class="p-10 text-center border-2 border-dashed border-zinc-100 rounded-3xl">
            <p class="text-zinc-400 text-sm">Has añadido todas las capacidades al plan.</p>
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
                  : 'bg-zinc-50 border-zinc-200 shadow-2xl shadow-zinc-200/50'
              ]"
            >
              <!-- Background Accent -->
              <div class="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 blur-[100px] -z-10"></div>
              
              <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                <div>
                  <span class="text-[10px] font-bold uppercase tracking-widest text-purple-500 mb-2 block">Resumen del Sistema</span>
                  <h2 class="text-4xl font-black italic tracking-tighter">Plan {{ basePlan.name }}</h2>
                </div>
                <div class="text-right">
                  <p class="text-[10px] font-bold text-zinc-400 uppercase mb-1">Inversión Final Est.</p>
                  <p class="text-4xl font-bold font-mono tracking-tighter text-zinc-900">
                    ${{ (basePlan.price + (selectedAddons.length * 5000)).toLocaleString() }}
                    <span class="text-sm font-medium text-zinc-400">MXN</span>
                  </p>
                </div>
              </div>

              <!-- Added Addons Container -->
              <div class="space-y-4 mb-12">
                <div v-if="selectedAddons.length === 0" class="py-20 flex flex-col items-center justify-center text-center">
                  <div class="w-20 h-20 rounded-full border-2 border-dashed border-zinc-200 flex items-center justify-center mb-6">
                    <Plus class="w-8 h-8 text-zinc-300" />
                  </div>
                  <h3 class="text-xl font-bold mb-2">Plan Base Vacío</h3>
                  <p class="text-zinc-400 text-sm max-w-xs">Arranque el sistema base y arrastre capacidades aquí para personalizarlo a su medida.</p>
                </div>

                <transition-group name="list" tag="div" class="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        <h4 class="font-bold text-zinc-900 mb-1">{{ addon.name }}</h4>
                        <p class="text-xs text-zinc-500 leading-tight">{{ addon.description }}</p>
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
              <div class="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-zinc-200 gap-8">
                <div class="flex items-center gap-3">
                  <div class="flex -space-x-3">
                    <div v-for="i in 3" :key="i" class="w-8 h-8 rounded-full border-2 border-zinc-50 bg-zinc-200 flex items-center justify-center text-[10px] font-bold">
                       {{ i }}
                    </div>
                  </div>
                  <p class="text-xs text-zinc-500">
                    <span class="font-bold text-zinc-900">{{ selectedAddons.length }}</span> capacidades añadidas al núcleo de {{ basePlan.name }}.
                  </p>
                </div>
                
                <button class="w-full md:w-auto px-10 py-5 bg-zinc-900 text-white rounded-2xl font-bold text-lg hover:bg-purple-700 transition-all shadow-xl shadow-zinc-900/10">
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
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

div {
  font-family: 'Inter', sans-serif;
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
