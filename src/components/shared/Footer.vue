<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const links = [
  { label: "Inicio", path: "/" },
  { label: "Servicios", path: "/services" },
  { label: "Sobre nosotros", path: "/about" },
  { label: "Contacto", path: "/contact" },
];

const social = [
  { name: "Instagram", icon: "📸", url: "#" },
  { name: "TikTok", icon: "🎵", url: "#" },
  { name: "LinkedIn", icon: "👔", url: "#" },
];

const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="footer flex flex-col items-center justify-center my-10">
    <div>
      <h1 class="text-[5em]">
        <span class="text-main-purple text-[2em]">S</span>imetri<span
          class="text-main-purple text-[2em]"
          >k</span
        >
      </h1>
    </div>
    <hr class="w-3/4" />
  </footer>
</template>

<style scoped>
@media (max-width: 1024px) {
  .footer-content {
    flex-direction: column;
  }

  .footer-links {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .footer {
    padding: 40px 24px;
  }

  .footer-links {
    grid-template-columns: 1fr;
  }

  .footer-bottom {
    flex-direction: column;
    gap: 16px;
  }
}
</style>
