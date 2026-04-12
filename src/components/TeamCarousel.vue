<script setup lang="ts">
import { ref } from "vue";
import Typewriter from "./shared/Typewriter.vue";

interface TeamMember {
  name: string;
  role: string;
  description: string;
  viewLink?: string;
  image?: string;
  emoji?: string;
}

interface Props {
  members: TeamMember[];
  typingSpeed?: number;
  sectionTitle?: string;
  sectionDescription?: string;
}

const props = withDefaults(defineProps<Props>(), {
  typingSpeed: 50,
  sectionTitle: "Un equipo construido\npara resultados reales",
  sectionDescription:
    "Cada persona domina su área. Juntos cubren todo el ciclo: desde captar la atención hasta cerrar y retener al cliente.",
});

const current = ref(0);

function focus(idx: number) {
  current.value = idx;
}

function next() {
  focus((current.value + 1) % props.members.length);
}

function prev() {
  focus((current.value - 1 + props.members.length) % props.members.length);
}
</script>

<template>
  <section class="team-section w-full md:w-3/4 mx-auto">
    <div class="team-header">
      <h2 class="team-title">{{ sectionTitle }}</h2>
      <p class="team-desc">{{ sectionDescription }}</p>
    </div>

    <div class="carousel">
      <div
        v-for="(member, i) in members"
        :key="member.name"
        class="card bg-black"
        :class="{ active: i === current, side: i !== current }"
        @click="focus(i)"
      >
        <div class="card-bg">
          <img
            v-if="member.image"
            :src="member.image"
            :alt="member.name"
            class="card-img"
          />
          <span v-else class="card-emoji">{{ member.emoji ?? "👤" }}</span>
        </div>

        <div v-if="i === current" class="card-label">
          <Typewriter
            :words="[member.role]"
            :typing-speed="typingSpeed"
            :delay="300"
            :loop="false"
          />
        </div>
      </div>
    </div>

    <div class="team-info">
      <div class="info-text">
        <Transition name="fade-slide-up" mode="out-in">
          <div :key="current" class="info-content-stable">
            <h3>{{ members[current].name }}</h3>
            <p>{{ members[current].description }}</p>
          </div>
        </Transition>
        <a
          v-if="members[current].viewLink"
          :href="members[current].viewLink"
          class="view-link"
        >
          Ver perfil <span>›</span>
        </a>
      </div>
      <div class="nav-controls">
        <button @click="prev" class="nav-btn" aria-label="Anterior">‹</button>
        <button @click="next" class="nav-btn" aria-label="Siguiente">›</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.team-section {
  padding: 80px 48px;
  background: #fff;
  /* Evitamos que la sección entera cambie de tamaño */
  min-height: 800px;
}

.team-header {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin-bottom: 48px;
  align-items: end;
}

.team-title {
  font-size: 42px;
  font-weight: 800;
  line-height: 1.1;
  color: #111;
  white-space: pre-line;
  letter-spacing: -1.5px;
}

.team-desc {
  font-size: 16px;
  color: #555;
  line-height: 1.6;
}

.carousel {
  display: flex;
  gap: 16px;
  height: 450px; /* Altura fija para el carrusel para evitar brincos */
}

.card {
  border-radius: 24px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  height: 100%;
  transition: all 0.6s cubic-bezier(0.25, 1, 0.5, 1);
  background-color: black;
}

.card.active {
  flex: 3;
}

.card.side {
  flex: 0.8;
}

.card-bg {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background: #f8f8f8; */
  overflow: hidden;
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.card:hover .card-img {
  transform: scale(1.05);
}

.card-emoji {
  font-size: 80px;
  filter: grayscale(0.2);
  transition: filter 0.3s ease;
}

.card.active .card-emoji {
  filter: grayscale(0);
}

.card-label {
  position: absolute;
  bottom: 30px;
  left: 30px;
  right: 30px;
  color: #fff;
  font-size: 24px;
  font-weight: 800;
  line-height: 1.2;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.4);
  /* Altura mínima para el Typewriter para que no colapse */
  min-height: 60px;
}

.play-btn {
  position: absolute;
  bottom: 25px;
  right: 25px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(8px);
  transition: all 0.3s ease;
}

.play-btn:hover {
  background: #801586;
  border-color: #801586;
  transform: scale(1.1);
}

.team-info {
  margin-top: 32px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
}

.info-text {
  flex: 1;
}

/* TRANSICIÓN DE TEXTO */
.fade-slide-up-enter-active,
.fade-slide-up-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-slide-up-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-slide-up-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* ESTABILIZADOR DE LAYOUT */
.info-content-stable {
  min-height: 100px;
}

.info-text h3 {
  font-size: 20px;
  font-weight: 800;
  color: #111;
  margin-bottom: 8px;
}

.info-text p {
  font-size: 15px;
  color: #666;
  line-height: 1.6;
  max-width: 500px;
}

.view-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 700;
  color: #111;
  text-decoration: none;
  margin-top: 15px;
  transition: color 0.3s ease;
}

.view-link:hover {
  color: #801586;
}

.nav-controls {
  display: flex;
  gap: 12px;
}

.nav-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1.5px solid #eee;
  background: #fff;
  cursor: pointer;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.nav-btn:hover {
  border-color: #801586;
  color: #801586;
  background: #fdf4ff;
}

@media (max-width: 1024px) {
  .team-section {
    padding: 60px 24px;
    width: 95%;
  }
  .carousel {
    height: 350px;
  }
}

@media (max-width: 768px) {
  .team-header {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  .team-title {
    font-size: 32px;
  }
  .card.active {
    flex: 5;
  }
  .card.side {
    flex: 1;
  }
  .info-content-stable {
    min-height: 140px;
  }
}
</style>
