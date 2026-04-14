<script setup lang="ts">
import { ref, onMounted } from "vue";
import {
  Mail,
  MapPin,
  MessageCircle,
  Send,
  ArrowRight,
  Globe,
  Instagram,
  Facebook,
  Linkedin,
} from "lucide-vue-next";
import Navbar from "../components/shared/Navbar.vue";
import Footer from "../components/shared/Footer.vue";

const form = ref({
  name: "",
  email: "",
  phone: "",
  message: "",
});

const isSubmitting = ref(false);

const handleSubmit = async () => {
  isSubmitting.value = true;
  // Mock API call
  await new Promise((resolve) => setTimeout(resolve, 2000));
  alert("Gracias por contactarnos. Te responderemos muy pronto.");
  isSubmitting.value = false;
  form.value = { name: "", email: "", phone: "", message: "" };
};

const socialLinks = [
  { icon: Instagram, id: "instagram" },
  { icon: Facebook, id: "facebook" },
  { icon: Linkedin, id: "linkedin" },
  { icon: Globe, id: "globe" },
];

onMounted(() => {
  window.scrollTo(0, 0);
});
</script>

<template>
  <div class="min-h-screen bg-white text-zinc-900 font-sans">
    <Navbar />

    <main class="pt-32 pb-20">
      <div class="max-w-7xl mx-auto px-6">
        <!-- Header -->
        <div class="max-w-3xl mb-16">
          <span
            class="inline-block px-3 py-1 bg-purple-50 text-main-purple rounded-full text-xs font-bold uppercase tracking-widest mb-4"
          >
            Contacto
          </span>
          <h1
            class="text-5xl md:text-7xl font-black text-zinc-900 mb-6 leading-tight"
          >
            Escalemos tu negocio <span class="text-main-purple">juntos.</span>
          </h1>
          <p class="text-xl text-zinc-500 leading-relaxed">
            ¿Tienes dudas sobre cómo Simetrik puede transformar tu proceso de
            ventas? Estamos aquí para ayudarte a implementar el sistema
            perfecto.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <!-- Contact Form -->
          <div class="lg:col-span-7">
            <div
              class="bg-zinc-50 rounded-[40px] p-8 md:p-12 border border-zinc-100 shadow-2xl shadow-zinc-200/50"
            >
              <h2 class="text-2xl font-bold mb-8">Envíanos un mensaje</h2>

              <form @submit.prevent="handleSubmit" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="space-y-2">
                    <label
                      class="text-xs font-bold uppercase tracking-wider text-zinc-400 ml-1"
                      >Nombre Completo</label
                    >
                    <input
                      v-model="form.name"
                      type="text"
                      required
                      placeholder="Ej. Juan Pérez"
                      class="w-full bg-white border border-zinc-200 rounded-2xl px-6 py-4 outline-none focus:border-main-purple transition-colors"
                    />
                  </div>
                  <div class="space-y-2">
                    <label
                      class="text-xs font-bold uppercase tracking-wider text-zinc-400 ml-1"
                      >Correo Electrónico</label
                    >
                    <input
                      v-model="form.email"
                      type="email"
                      required
                      placeholder="juan@empresa.com"
                      class="w-full bg-white border border-zinc-200 rounded-2xl px-6 py-4 outline-none focus:border-main-purple transition-colors"
                    />
                  </div>
                </div>

                <div class="space-y-2">
                  <label
                    class="text-xs font-bold uppercase tracking-wider text-zinc-400 ml-1"
                    >WhatsApp / Teléfono</label
                  >
                  <input
                    v-model="form.phone"
                    type="tel"
                    placeholder="+52 000 000 0000"
                    class="w-full bg-white border border-zinc-200 rounded-2xl px-6 py-4 outline-none focus:border-main-purple transition-colors"
                  />
                </div>

                <div class="space-y-2">
                  <label
                    class="text-xs font-bold uppercase tracking-wider text-zinc-400 ml-1"
                    >¿En qué podemos ayudarte?</label
                  >
                  <textarea
                    v-model="form.message"
                    required
                    rows="4"
                    placeholder="Cuéntanos un poco sobre tu negocio y tus objetivos..."
                    class="w-full bg-white border border-zinc-200 rounded-2xl px-6 py-4 outline-none focus:border-main-purple transition-colors resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  :disabled="isSubmitting"
                  class="w-full bg-main-purple text-white py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:shadow-xl hover:shadow-purple-500/20 active:scale-[0.98] transition-all disabled:opacity-50"
                >
                  <span v-if="!isSubmitting">Enviar Mensaje</span>
                  <span v-else>Enviando...</span>
                  <Send v-if="!isSubmitting" :size="20" />
                </button>
              </form>
            </div>
          </div>

          <!-- Contact Info -->
          <div class="lg:col-span-5 space-y-10">
            <div>
              <h2
                class="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-8"
              >
                Información Directa
              </h2>
              <div class="space-y-6">
                <a
                  href="mailto:hola@simetrikapp.com"
                  class="group flex items-center gap-6 p-6 rounded-3xl border border-zinc-100 hover:border-purple-200 hover:bg-purple-50/30 transition-all"
                >
                  <div
                    class="p-4 rounded-2xl bg-purple-50 text-main-purple group-hover:bg-main-purple group-hover:text-white transition-colors"
                  >
                    <Mail :size="24" />
                  </div>
                  <div>
                    <p class="text-xs font-bold text-zinc-400 uppercase mb-1">
                      Escríbenos
                    </p>
                    <p class="text-lg font-bold">hola@simetrikapp.com</p>
                  </div>
                </a>

                <a
                  href="https://wa.me/520000000000"
                  class="group flex items-center gap-6 p-6 rounded-3xl border border-zinc-100 hover:border-green-200 hover:bg-green-50/30 transition-all"
                >
                  <div
                    class="p-4 rounded-2xl bg-green-50 text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors"
                  >
                    <MessageCircle :size="24" />
                  </div>
                  <div>
                    <p class="text-xs font-bold text-zinc-400 uppercase mb-1">
                      WhatsApp
                    </p>
                    <p class="text-lg font-bold">+52 000 000 0000</p>
                  </div>
                </a>

                <div
                  class="group flex items-center gap-6 p-6 rounded-3xl border border-zinc-100"
                >
                  <div class="p-4 rounded-2xl bg-blue-50 text-blue-600">
                    <MapPin :size="24" />
                  </div>
                  <div>
                    <p class="text-xs font-bold text-zinc-400 uppercase mb-1">
                      Ubicación
                    </p>
                    <p class="text-lg font-bold">Ciudad de México, MX</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2
                class="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-8"
              >
                Búscanos en Redes
              </h2>
              <div class="flex gap-4">
                <a
                  v-for="social in socialLinks"
                  :key="social.id"
                  href="#"
                  class="w-14 h-14 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center justify-center text-zinc-400 hover:bg-main-purple hover:text-white hover:border-main-purple transition-all"
                >
                  <component :is="social.icon" :size="20" />
                </a>
              </div>
            </div>

            <div
              class="p-8 bg-zinc-900 rounded-[32px] text-white overflow-hidden relative group"
            >
              <div
                class="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 blur-[60px]"
              ></div>
              <h3 class="text-xl font-bold mb-4 relative z-10">
                ¿Listo para empezar hoy?
              </h3>
              <p
                class="text-zinc-400 text-sm mb-6 relative z-10 leading-relaxed"
              >
                Agenda una llamada de estrategia de 15 minutos para conocer tu
                caso.
              </p>
              <router-link
                to="/configurar/starter"
                class="inline-flex items-center gap-2 text-main-purple font-bold group-hover:gap-4 transition-all"
              >
                Ver Planes <ArrowRight :size="16" />
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<style scoped>
input::placeholder,
textarea::placeholder {
  color: #a1a1aa;
}
</style>
