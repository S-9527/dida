<script setup lang="ts">
import { Themes } from '@/composables/settings'
import Item from './Item.vue'
</script>

<template>
  <div>
    <h2 class="text-16px font-medium">
      外观
    </h2>
    <p class="mt-2px text-13px text-ink-3">
      当前可选择的皮肤
    </p>
    <div class="mt-20px flex items-start gap-18px">
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
