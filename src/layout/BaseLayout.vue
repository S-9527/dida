<template>
  <div>
    <TheHeader />
    <slot />
  </div>
</template>

<script setup lang="ts">
import TheHeader from '@/components/header/TheHeader.vue'
</script>

<style scoped></style>