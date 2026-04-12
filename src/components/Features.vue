<script setup lang="ts">
import { 
  CheckCircle2, 
  Clock, 
  MessageSquare, 
  Facebook,
  Instagram,
  BarChart3,
  Zap,
  UserPlus,
  Target
} from "lucide-vue-next";
import SpinningGradientCard from "./shared/SpinningGradientCard.vue";

const adsStats = [
  { label: 'Alcance', value: '45.2k', grow: '+12%' },
  { label: 'Clicks', value: '2.8k', grow: '+8%' },
  { label: 'Conversión', value: '4.2%', grow: '+15%' }
];

const crmLeads = [
  { name: 'Juan Perez', status: 'Nuevo Lead', time: 'hace 2 min', color: 'bg-blue-500' },
  { name: 'Maria Garcia', status: 'Calificado', time: 'hace 15 min', color: 'bg-green-500' },
  { name: 'Carlos Ruiz', status: 'Contactado', time: 'hace 1 hora', color: 'bg-purple-500' }
];
</script>

<template>
  <section class="features w-3/4 mx-auto py-20">
    <!-- Row 1: Ads -->
    <div class="feature-row">
      <div class="feature-text">
        <div class="tag">Marketing & Ads</div>
        <h2>¿Quieres conseguir más clientes?</h2>
        <p>
          Con nuestras campañas Meta Ads, atraes prospectos listos para comprar
          todos los días, sin depender de respuestas manuales.
        </p>
        <ul class="feature-list">
          <li><CheckCircle2 :size="18" class="text-green-500" /> Segmentación avanzada</li>
          <li><CheckCircle2 :size="18" class="text-green-500" /> Optimización de presupuesto</li>
        </ul>
      </div>
      <div class="feature-card">
        <SpinningGradientCard
          spin-duration="8s"
          :colors="['#f9a8d4', '#801586', '#bbf7d0']"
          inner-color="#ffffff"
        >
          <div class="mockup-container p-6 bg-white min-h-[300px]">
            <div class="flex justify-between items-center mb-6">
              <span class="font-bold text-gray-800 flex items-center gap-2">
                <Target :size="18" class="text-blue-500" /> Campaña Activa
              </span>
              <div class="flex gap-2">
                <Facebook :size="16" class="text-blue-600" />
                <Instagram :size="16" class="text-pink-600" />
              </div>
            </div>
            
            <div class="space-y-3">
              <div v-for="stat in adsStats" :key="stat.label" class="p-3 border border-gray-100 rounded-xl hover:border-purple-200 transition-colors">
                <div class="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-1">{{ stat.label }}</div>
                <div class="flex justify-between items-end">
                  <div class="text-xl font-bold">{{ stat.value }}</div>
                  <div class="text-green-500 text-xs font-bold">{{ stat.grow }}</div>
                </div>
              </div>
            </div>
            
            <div class="mt-4 flex items-center gap-2 bg-blue-50 p-2 rounded-lg">
              <Zap :size="14" class="text-blue-600 fill-blue-600" />
              <span class="text-[10px] font-bold text-blue-700">IA Optimizando anuncios...</span>
            </div>
          </div>
        </SpinningGradientCard>
      </div>
    </div>

    <!-- Row 2: CRM -->
    <div class="feature-row reverse">
      <div class="feature-text">
        <div class="tag green">CRM Inteligente</div>
        <h2>¿Quieres retener a tus clientes?</h2>
        <p>
          Nuestro CRM responde al instante, da seguimiento constante y organiza tus contactos en un solo lugar.
        </p>
        <ul class="feature-list">
          <li><CheckCircle2 :size="18" class="text-green-500" /> Notificaciones instantáneas</li>
          <li><CheckCircle2 :size="18" class="text-green-500" /> Automatización de chat</li>
        </ul>
      </div>
      <div class="feature-card">
        <SpinningGradientCard
          spin-duration="10s"
          :colors="['#bbf7d0', '#801586', '#fde68a']"
          inner-color="#ffffff"
        >
          <div class="mockup-container p-6 bg-white min-h-[300px]">
            <div class="flex justify-between items-center mb-6">
              <span class="font-bold text-gray-800 flex items-center gap-2">
                <UserPlus :size="18" class="text-green-500" /> Nuevos Prospects
              </span>
              <MessageSquare :size="18" class="text-green-500" />
            </div>
            
            <div class="space-y-3">
              <div v-for="lead in crmLeads" :key="lead.name" class="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" :class="lead.color">
                    {{ lead.name[0] }}
                  </div>
                  <div>
                    <div class="font-bold text-xs">{{ lead.name }}</div>
                    <div class="text-[10px] text-blue-600 font-bold">{{ lead.status }}</div>
                  </div>
                </div>
                <div class="text-[9px] text-gray-400 flex items-center gap-1">
                  <Clock :size="10" /> {{ lead.time }}
                </div>
              </div>
            </div>
          </div>
        </SpinningGradientCard>
      </div>
    </div>

    <!-- Row 3: Scaling -->
    <div class="feature-row">
      <div class="feature-text">
        <div class="tag purple">Escalado & Datos</div>
        <h2>¿Quieres escalar tu negocio?</h2>
        <p>
          Centralizas datos, automatizas procesos y tomas decisiones con métricas reales para crecer hoy.
        </p>
        <ul class="feature-list">
          <li><CheckCircle2 :size="18" class="text-green-500" /> Reportes en tiempo real</li>
          <li><CheckCircle2 :size="18" class="text-green-500" /> Análisis de rendimiento</li>
        </ul>
      </div>
      <div class="feature-card">
        <SpinningGradientCard
          spin-duration="12s"
          :colors="['#fde68a', '#f9a8d4', '#801586']"
          inner-color="#050505"
        >
          <div class="mockup-container p-6 bg-[#050505] min-h-[300px] text-white">
            <div class="flex justify-between items-center mb-6">
              <span class="font-bold text-gray-200 text-sm">Escalabilidad BI</span>
              <BarChart3 :size="18" class="text-purple-400" />
            </div>
            
            <div class="flex items-end gap-2 h-24 mb-6">
              <div class="flex-1 bg-purple-500/20 rounded-t-lg h-[30%]"></div>
              <div class="flex-1 bg-purple-500/40 rounded-t-lg h-[50%]"></div>
              <div class="flex-1 bg-purple-500/60 rounded-t-lg h-[75%]"></div>
              <div class="flex-1 bg-purple-500 rounded-t-lg h-[100%] animate-pulse"></div>
            </div>
            
            <div class="grid grid-cols-2 gap-3">
              <div class="bg-white/5 p-3 rounded-xl border border-white/10">
                <div class="text-[9px] text-gray-400 uppercase font-bold mb-1">ROI Global</div>
                <div class="text-lg font-bold text-purple-400">3.8x</div>
              </div>
              <div class="bg-white/5 p-3 rounded-xl border border-white/10">
                <div class="text-[9px] text-gray-400 uppercase font-bold mb-1">Crecimiento</div>
                <div class="text-lg font-bold text-green-400">+124%</div>
              </div>
            </div>
          </div>
        </SpinningGradientCard>
      </div>
    </div>
  </section>
</template>

<style scoped>
.features {
  display: flex;
  flex-direction: column;
  gap: 120px;
}

.feature-row {
  display: flex;
  align-items: center;
  gap: 80px;
}

.feature-row.reverse {
  flex-direction: row-reverse;
}

.feature-text {
  flex: 1.2;
}

.tag {
  display: inline-block;
  padding: 4px 12px;
  background: rgba(128, 21, 134, 0.1);
  color: #801586;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.tag.green { background: rgba(34, 197, 94, 0.1); color: #166534; }
.tag.purple { background: rgba(124, 58, 237, 0.1); color: #6d28d9; }

.feature-text h2 {
  font-size: 42px;
  font-weight: 800;
  color: #111;
  margin-bottom: 20px;
  line-height: 1.1;
  letter-spacing: -1.5px;
}

.feature-text p {
  font-size: 18px;
  color: #555;
  line-height: 1.6;
  margin-bottom: 30px;
}

.feature-list {
  list-style: none;
  padding: 0;
  display: grid;
  gap: 12px;
}

.feature-list li {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 15px;
  font-weight: 600;
  color: #333;
}

.feature-card {
  flex: 1;
  min-width: 0;
}

.mockup-container {
  border-radius: 12px;
}

@media (max-width: 1024px) {
  .feature-row, .feature-row.reverse {
    flex-direction: column;
    text-align: center;
    gap: 40px;
  }
  .feature-list {
    justify-content: center;
  }
}
</style>

