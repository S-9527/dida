<script setup lang="ts">
import { NCard, NTabPane, NTabs } from 'naive-ui'
import SignIn from '@/components/login/SignIn.vue'
import SignUp from '@/components/login/SignUp.vue'

const tabsThemeOverrides = {
  tabFontWeight: 'normal',
  tabFontSize: '14px',
  tabTextColor: 'var(--ink-2)',
  tabTextColorHover: 'var(--ink-1)',
  tabTextColorActive: 'var(--accent)',
  railColorActive: 'var(--accent)',
  lineColor: 'var(--border)',
}
</script>

<template>
  <div class="h-full min-h-screen flex items-center justify-center bg-app px-20px">
    <div class="max-w-400px w-full">
      <div class="mb-24px flex flex-col items-center gap-10px">
        <span
          class="h-44px w-44px flex items-center justify-center rounded-xl bg-accent text-22px text-white font-bold"
        >
          D
        </span>
        <h1 class="text-22px font-semibold tracking-tight">
          欢迎回到 DiDa
        </h1>
        <p class="text-13px text-ink-3">
          登录或创建你的账号
        </p>
      </div>

      <NCard :bordered="false" class="card" content-style="padding: 24px">
        <NTabs
          default-value="signIn"
          size="large"
          animated
          pane-wrapper-style="margin: 0 -4px"
          pane-style="padding-left: 4px; padding-right: 4px; box-sizing: border-box;"
          :theme-overrides="tabsThemeOverrides"
        >
          <NTabPane name="signIn" tab="登录">
            <SignIn />
          </NTabPane>
          <NTabPane name="signup" tab="注册">
            <SignUp />
          </NTabPane>
        </NTabs>
      </NCard>
    </div>
  </div>
</template>
