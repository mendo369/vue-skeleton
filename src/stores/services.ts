import { defineStore } from 'pinia';
import { ref } from 'vue';
import { 
  Bot, 
  Star, 
  Users, 
  RotateCw, 
  LineChart, 
  Layout, 
  Megaphone, 
  Settings, 
  Brain, 
  Zap,
  Globe,
  ClipboardList,
  Calendar,
  MessageSquare,
  Search,
  ShieldCheck
} from 'lucide-vue-next';

export interface ServiceItem {
  nombre: string;
  descripcion: string;
  tooltip: string;
}

export interface PlanPackage {
  id: string;
  nombre: string;
  precio_setup: number;
  destacado: boolean;
  descripcion: string;
  incluye_id?: string;
  servicios?: ServiceItem[];
  servicios_adicionales?: ServiceItem[];
}

export interface UpsellModule {
  id: string;
  nombre: string;
  precio_setup: number;
  descripcion_corta: string;
  tooltip: string;
  disponible_en: string[];
}

export interface MonthlyAddon {
  id: string;
  nombre: string;
  precio_mensual: number;
  precio_setup?: number;
  descripcion: string;
  tooltip: string;
}

export interface ServicesData {
  propuesta: {
    titulo: string;
    tiempo_entrega: string;
    garantia: string;
  };
  configuracion_base: {
    cuota_mensual_mantenimiento: number;
    moneda: string;
    detalles_mantenimiento: string;
  };
  paquetes_implementacion: PlanPackage[];
  upsells_setup: UpsellModule[];
  addons_mensuales: MonthlyAddon[];
}

export const useServicesStore = defineStore('services', () => {
  const data = ref<ServicesData | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchServices = async () => {
    loading.value = true;
    try {
      const response = await fetch('/services.json');
      if (!response.ok) throw new Error('Failed to fetch services');
      data.value = await response.json();
    } catch (err: any) {
      error.value = err.message;
      console.error('Error loading services:', err);
    } finally {
      loading.value = false;
    }
  };

  const getIcon = (name: string) => {
    const iconMap: Record<string, any> = {
      'Landing page': Globe,
      'Formulario de calificación': ClipboardList,
      'CRM Simetrika pp': Layout,
      'Calendario de agendamiento': Calendar,
      'Seguimiento automático 7 días': MessageSquare,
      'Tracking base': Search,
      'Seguimiento 30 días': RotateCw,
      'No-show': RotateCw,
      'Winback': Zap,
      'Tracking Pro': LineChart,
      'Asistente virtual (Bot FAQ)': Bot,
      'Bot FAQ + Objeciones': Bot,
      'Handoff a humano': Users,
      'CRM Team Pack': Users,
      'Sistema de reseñas': Star,
      'Mantenimiento Plus': Settings,
      'Bot Pro': Brain,
      'Gestión de anuncios': Megaphone,
      'Campaña Evergreen': Megaphone,
    };
    return iconMap[name] || ShieldCheck;
  };

  return {
    data,
    loading,
    error,
    fetchServices,
    getIcon
  };
});
