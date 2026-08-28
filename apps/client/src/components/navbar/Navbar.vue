<script setup lang="ts">
import type { DropdownMixedOption } from 'naive-ui/es/dropdown/src/interface'
import { NDropdown, NPopover } from 'naive-ui'
import Command from '@/components/command/CommandModal.vue'
import { useGoto } from '@/composables'
import { useCommandModal } from '../command/commandModal'

const { gotoSettings } = useGoto()
const { openCommandModal } = useCommandModal()

const settingOptions: DropdownMixedOption[] = [
  {
    label: '设置',
    key: 'settings',
    props: {
      onClick: () => {
        gotoSettings()
      },
    },
  },
]
</script>

<template>
  <div class="w-[48px] border-r border-blue border-solid py-2 dark:bg-black">
    <NDropdown placement="right-end" :options="settingOptions">
      <!-- avatar -->
      <div class="mx-auto h-[32px] w-[32px] rounded-sm bg-blue">
        <img src="" alt="">
      </div>
    </NDropdown>
    <!-- page router -->
    <div
      class="mt-10 flex flex-col items-center justify-center gap-6 text-xl text-gray-4 font-bold"
    >
      <!-- <template v-for="(iconOption, i) in activityIconOptions" :key="i">
        <NPopover placement="right">
          <template #trigger>
            <div
              class="hover:text-gray-6 dark:hover:text-gray-2"
              :i="iconOption.icon"
              @click="() => iconOption.onClick && iconOption.onClick()"
            />
          </template>
          <span>{{ iconOption.label }}</span>
        </NPopover>
      </template> -->
      <NPopover placement="right">
        <template #trigger>
          <div
            class="hover:text-gray-6 dark:hover:text-gray-2"
            i="carbon-checkbox-checked-filled"
          />
        </template>
        <span>任务</span>
      </NPopover>
      <NPopover placement="right">
        <template #trigger>
          <div
            class="hover:text-gray-6 dark:hover:text-gray-2"
            i="carbon-calendar-heat-map"
          />
        </template>
        <span>日历</span>
      </NPopover>
      <NPopover placement="right">
        <template #trigger>
          <div
            class="hover:text-gray-6 dark:hover:text-gray-2"
            i="carbon-task-complete"
          />
        </template>
        <span>打卡</span>
      </NPopover>
      <NPopover placement="right">
        <template #trigger>
          <div
            class="cursor-pointer hover:text-gray-6 dark:hover:text-gray-2"
            i="carbon-search"
            @click="() => openCommandModal()"
          />
        </template>
        <span>搜索面板</span>
      </NPopover>
    </div>
    <Command />
  </div>
</template>
