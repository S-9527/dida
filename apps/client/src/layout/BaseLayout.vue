<script setup lang="ts">
import CommandModal from '@/components/command/CommandModal.vue'
import TheHeader from '@/components/header/TheHeader.vue'
import Navbar from '@/components/navbar/Navbar.vue'
</script>

<template>
  <div class="h-full flex flex-col bg-app">
    <TheHeader />
    <div class="min-h-0 flex flex-1">
      <Navbar />
      <main class="h-full min-w-0 flex-1 overflow-hidden">
        <slot />
      </main>
    </div>
    <CommandModal />
  </div>
</template>
