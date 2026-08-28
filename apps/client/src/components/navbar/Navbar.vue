<script setup lang="ts">
import type { DropdownMixedOption } from 'naive-ui/es/dropdown/src/interface'
import { Icon } from '@iconify/vue'
import { NDropdown, NPopover } from 'naive-ui'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { goToLogin, useGoto } from '@/composables/goto'
import { RouteNames } from '@/router/const'
import { useUserStore } from '@/store'

interface NavItem {
  key: string
  icon: string
  label: string
  disabled?: boolean
}

const navItems: NavItem[] = [
  {
    key: RouteNames.TASK,
    icon: 'carbon-checkbox-checked-filled',
    label: '任务',
  },
  {
    key: 'calendar',
    icon: 'carbon-calendar-heat-map',
    label: '日历',
    disabled: true,
  },
  {
    key: 'checkin',
    icon: 'carbon-task-complete',
    label: '打卡',
    disabled: true,
  },
]

const route = useRoute()
const userStore = useUserStore()
const { gotoHome, gotoSettings } = useGoto()

const avatarInitial = computed(
  () => userStore.user.username.charAt(0).toUpperCase() || 'U',
)

const userOptions: DropdownMixedOption[] = [
  {
    label: '设置',
    key: 'settings',
    props: { onClick: () => gotoSettings() },
  },
  { type: 'divider', key: 'divider' },
  {
    label: '退出登录',
    key: 'logout',
    props: { onClick: () => handleLogout() },
  },
]

function isActive(item: NavItem) {
  return route.name === item.key
}

function handleNavClick(item: NavItem) {
  if (item.disabled)
    return

  gotoHome()
}

async function handleLogout() {
  await userStore.logout()
  goToLogin()
}
</script>

<template>
  <aside
    class="w-64px flex flex-shrink-0 flex-col items-center border-r border-line bg-panel py-12px"
  >
    <nav class="flex flex-col items-center gap-8px">
      <template v-for="item in navItems" :key="item.key">
        <NPopover
          v-if="!item.disabled"
          trigger="hover"
          placement="right"
          :show-arrow="false"
        >
          <template #trigger>
            <button
              class="h-38px w-38px flex items-center justify-center rounded-lg transition-colors duration-150"
              :class="
                isActive(item)
                  ? 'bg-accent-soft text-accent'
                  : 'text-ink-3 hover:bg-hover hover:text-ink'
              "
              @click="handleNavClick(item)"
            >
              <Icon :icon="item.icon" width="20" />
            </button>
          </template>
          <span class="text-12px">{{ item.label }}</span>
        </NPopover>
        <div
          v-else
          class="h-38px w-38px flex cursor-not-allowed items-center justify-center rounded-lg text-ink-3 opacity-60"
        >
          <Icon :icon="item.icon" width="20" />
        </div>
      </template>
    </nav>

    <div class="mt-auto">
      <NDropdown :options="userOptions" placement="top-start" trigger="click">
        <button
          class="h-30px w-30px flex items-center justify-center rounded-full bg-accent-soft text-13px text-accent font-semibold"
        >
          {{ avatarInitial }}
        </button>
      </NDropdown>
    </div>
  </aside>
</template>
