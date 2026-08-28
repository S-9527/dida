<script setup lang="ts">
import { Themes } from '@/composables/settings'
import Item from './Item.vue'
</script>

<template>
  <div class="p-8">
    <div class="text-14px text-dark/70 font-light dark:text-white/70">
      当前可选择的皮肤
    </div>
    <div class="mt-20px flex items-center justify-start gap-18px">
      <Item
        v-for="theme in Themes"
        :key="theme.name"
        :label="theme.label"
        :color="theme.color"
        :name="theme.name"
      />
    </div>
  </div>
</template>

<style scoped></style>
