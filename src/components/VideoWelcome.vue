<script setup lang="ts"></script>

<template>
  <div class="w-full bg-white py-24 px-4 flex flex-col items-center">
    <div
      class="max-w-6xl w-full aspect-video rounded-3xl overflow-hidden shadow-2xl border-8 border-black bg-black"
    >
      <iframe
        class="w-full h-full"
        src="https://www.youtube.com/embed/SVCBA-pBgt0"
        title="YouTube video player"
        frameborder="0"
        allow="
          accelerometer;
          autoplay;
          clipboard-write;
          encrypted-media;
          gyroscope;
          picture-in-picture;
          web-share;
        "
        allowfullscreen
      ></iframe>
    </div>
    <div class="mt-12 text-center">
      <h2 class="text-3xl font-bold text-main-gray mb-4">
        Descubre cómo Simetri-K impulsa tu negocio
      </h2>
      <p class="text-lg text-main-gray/70 max-w-xl">
        Mira nuestro video de bienvenida y conoce las herramientas que
        revolucionarán tu e-commerce.
      </p>
    </div>
  </div>
</template>

<style scoped></style>
