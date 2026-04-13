<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import {
  Boxes,
  ChevronDown,
  Target,
  Zap,
  TrendingUp,
  Layout,
  ArrowRight,
} from "lucide-vue-next";

const isOpen = ref(false);
const navRef = ref<HTMLElement | null>(null);

const services = [
  {
    title: "Estrategia & Dirección",
    slug: "estrategia-direccion",
    icon: Target,
    desc: "Liderazgo táctico y visión de negocio.",
  },
  {
    title: "Campañas & Automatizaciones",
    slug: "campanas-automatizaciones",
    icon: Zap,
    desc: "Marketing inteligente 24/7.",
  },
  {
    title: "Growth & Funnels",
    slug: "growth-funnels",
    icon: TrendingUp,
    desc: "Escalabilidad basada en datos.",
  },
  {
    title: "Frontend & Experiencia",
    slug: "frontend-experiencia",
    icon: Layout,
    desc: "Interfaces que convierten.",
  },
];

function toggleMenu() {
  isOpen.value = !isOpen.value;
}

function closeMenu() {
  isOpen.value = false;
}

// Close on escape key
function handleKeydown(e: KeyboardEvent) {
  if (e.key === "Escape") closeMenu();
}

// Close on outside click
function handleClickOutside(e: MouseEvent) {
  if (navRef.value && !navRef.value.contains(e.target as Node)) {
    closeMenu();
  }
}

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
  window.addEventListener("mousedown", handleClickOutside);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
  window.removeEventListener("mousedown", handleClickOutside);
});
</script>

<template>
  <nav
    ref="navRef"
    class="w-full px-4 md:px-[10em] py-3 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-50 border-b border-zinc-100"
  >
    <div class="flex gap-8 items-center">
      <router-link
        to="/"
        @click="closeMenu"
        class="text-xl font-black tracking-tighter"
        >Simetrik</router-link
      >

      <!-- Desktop Links -->
      <div class="hidden md:flex gap-6 items-center">
        <router-link
          to="/"
          @click="closeMenu"
          class="text-zinc-500 hover:text-black transition-colors font-medium text-sm"
          >Inicio</router-link
        >
        <router-link
          to="/pricing"
          @click="closeMenu"
          class="text-zinc-500 hover:text-black transition-colors font-medium text-sm"
          >Precios</router-link
        >

        <!-- Toggleable Services Menu -->
        <div class="relative">
          <button
            @click="toggleMenu"
            :class="[
              'flex items-center gap-1.5 transition-all font-medium text-sm px-3 py-1.5 rounded-full',
              isOpen
                ? 'bg-zinc-100 text-black'
                : 'text-zinc-500 hover:text-black hover:bg-zinc-50',
            ]"
          >
            Servicios
            <ChevronDown
              :size="14"
              :class="[
                'transition-transform duration-300',
                { 'rotate-180': isOpen },
              ]"
            />
          </button>

          <!-- Megamenu Dropdown -->
          <transition
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="opacity-0 translate-y-2"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition duration-200 ease-in"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 translate-y-2"
          >
            <div
              v-if="isOpen"
              class="absolute left-1/2 -translate-x-1/2 top-12 w-[600px] bg-white border border-zinc-100 rounded-[32px] shadow-2xl shadow-zinc-200/50 p-8 overflow-hidden"
            >
              <div class="flex gap-12">
                <!-- Left Side: Context -->
                <div class="w-1/3">
                  <h3 class="text-lg font-bold tracking-tight mb-3">
                    Especialidades
                  </h3>
                  <p class="text-xs text-zinc-400 leading-relaxed mb-6">
                    Explora cómo nuestras áreas se integran para escalar tu
                    negocio.
                  </p>
                  <router-link
                    to="/pricing"
                    @click="closeMenu"
                    class="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-900 hover:gap-3 transition-all"
                  >
                    Ver Planes <ArrowRight :size="12" />
                  </router-link>
                </div>

                <!-- Right Side: Links Grid -->
                <div class="w-2/3 grid grid-cols-1 gap-2">
                  <router-link
                    v-for="service in services"
                    :key="service.slug"
                    :to="'/servicios/' + service.slug"
                    @click="closeMenu"
                    class="group flex items-start gap-4 p-4 rounded-2xl hover:bg-zinc-50 transition-all border border-transparent hover:border-zinc-100"
                  >
                    <div
                      class="p-2.5 rounded-xl bg-zinc-100 group-hover:bg-white group-hover:shadow-sm transition-all text-zinc-900"
                    >
                      <component :is="service.icon" :size="20" />
                    </div>
                    <div>
                      <h4 class="text-sm font-bold text-zinc-900 mb-0.5">
                        {{ service.title }}
                      </h4>
                      <p
                        class="text-[11px] text-zinc-400 group-hover:text-zinc-600 transition-colors"
                      >
                        {{ service.desc }}
                      </p>
                    </div>
                  </router-link>
                </div>
              </div>

              <!-- Bottom Accent -->
              <div
                class="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 opacity-20"
              ></div>
            </div>
          </transition>
        </div>

        <div
          class="text-zinc-500 hover:text-black cursor-pointer transition-colors font-medium text-sm"
        >
          Contacto
        </div>
      </div>
    </div>

    <!-- CTA -->
    <router-link
      to="/pricing"
      class="flex items-center bg-black px-5 py-2.5 rounded-full hover:scale-105 transition-transform active:scale-95 shadow-lg shadow-black/10"
    >
      <div class="text-white text-sm flex items-center gap-2 font-bold">
        <Boxes :size="16" />
        <span class="hidden sm:inline">Obtener Ahora</span>
        <span class="sm:hidden">Empezar</span>
      </div>
    </router-link>
  </nav>
</template>

<style scoped>
/* Ensure the backdrop blur works even with the megamenu open */
nav {
  isolation: isolate;
}
</style>
