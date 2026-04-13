<script setup lang="ts">
import {
  Award,
  BarChart3,
  Calendar,
  CheckCircle2,
  CreditCard,
  Database,
  Globe,
  Layers,
  Mail,
  Megaphone,
  MessageSquare,
  Package,
  Rocket,
  Shield,
  ShoppingCart,
  Smartphone,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-vue-next";
import IconDock from "./shared/IconDock.vue";
import Typewriter from "./shared/Typewriter.vue";
import { ref, onMounted, onUnmounted } from "vue";

const isVisible = ref(false);
const sectionRef = ref<HTMLElement | null>(null);

let observer: IntersectionObserver | null = null;

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        isVisible.value = true;
        if (sectionRef.value) observer?.unobserve(sectionRef.value);
      }
    },
    { threshold: 0.2 },
  );

  if (sectionRef.value) {
    observer.observe(sectionRef.value);
  }
});

onUnmounted(() => {
  if (observer) observer.disconnect();
});

// const dockItems = [
//   { id: "back", icon: "←", label: "Atrás" },
//   { id: "forward", icon: "→", label: "Adelante" },
//   { id: "sparkle", icon: "✦", label: "AI" },
//   { id: "code", icon: "⟨⟩", label: "Código" },
//   { id: "nodes", icon: "⌥", label: "Nodos" },
//   { id: "grid", icon: "⊞", label: "Grid" },
//   { id: "cube", icon: "⬡", label: "Cubo" },
//   { id: "star", icon: "★", label: "Favorito" },
//   { id: "check", icon: "✓", label: "Verificar" },
//   { id: "tag", icon: "<>", label: "HTML" },
//   { id: "terminal", icon: "▶_", label: "Terminal" },
//   { id: "sync", icon: "⇄", label: "Sincronizar" },
//   { id: "folder", icon: "□", label: "Carpeta" },
//   { id: "edit", icon: "✎", label: "Editar" },
//   { id: "search", icon: "⌕", label: "Buscar" },
//   { id: "refresh", icon: "↺", label: "Refrescar" },
//   { id: "copy", icon: "⎘", label: "Copiar" },
//   { id: "more", icon: "⋯", label: "Más" },
// ];

const dockItems = [
  { id: "ads", icon: Megaphone, label: "Ads" },
  { id: "cart", icon: ShoppingCart, label: "E-commerce" },
  { id: "users", icon: Users, label: "CRM" },
  { id: "chart", icon: BarChart3, label: "Analytics" },
  { id: "zap", icon: Zap, label: "Automatización" },
  { id: "target", icon: Target, label: "Estrategia" },
  { id: "trending", icon: TrendingUp, label: "Crecimiento" },
  { id: "check", icon: CheckCircle2, label: "Resultados" },
  { id: "package", icon: Package, label: "Inventario" },
  { id: "layers", icon: Layers, label: "Integración" },
  { id: "database", icon: Database, label: "Datos" },
  { id: "mail", icon: Mail, label: "Email Marketing" },
  { id: "message", icon: MessageSquare, label: "Mensajería" },
  { id: "calendar", icon: Calendar, label: "Agendamiento" },
  { id: "credit-card", icon: CreditCard, label: "Pagos" },
  { id: "globe", icon: Globe, label: "Web" },
  { id: "smartphone", icon: Smartphone, label: "Mobile" },
  { id: "shield", icon: Shield, label: "Seguridad" },
  { id: "rocket", icon: Rocket, label: "Lanzamiento" },
  { id: "award", icon: Award, label: "Calidad" },
];
</script>

<template>
  <section ref="sectionRef" class="flex flex-col justify-center items-center">
    <IconDock
      :items="dockItems"
      :item-size="100"
      :wave-amplitude="14"
      :wave-speed="0.035"
      :wave-spread="0.45"
    />
    <div
      class="text-2xl md:text-[3em] leading-tight text-center font-bold mb-8 mt-10 w-3/4 mx-auto"
    >
      <Typewriter
        v-if="isVisible"
        :words="[
          'Simetrik transforma tu caos en un sistema que vende solo. \n Campañas + CRM + Automatización. Todo en uno. \n Deja de perseguir clientes. Empieza a cerrar ventas.',
        ]"
        :loop="false"
        :typing-speed="20"
        :blink-speed="'0.8s'"
      />
    </div>
  </section>
</template>

<style></style>
