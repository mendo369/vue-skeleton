<script setup lang="ts"></script>

<template>
  <footer class="footer flex flex-col items-center justify-center my-10">
    <div>
      <img src="/simetrik.png" alt="" class="w-32" />
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
