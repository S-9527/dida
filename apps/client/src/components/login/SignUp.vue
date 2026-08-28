<script setup lang="ts">
import type { FormInst } from 'naive-ui'

import { NButton, NForm, NFormItem, NInput } from 'naive-ui'
import { reactive, ref } from 'vue'
import { useGoto } from '@/composables/goto'
import { useUserStore } from '@/store'
import {
  createConfirmPasswordRule,
  createPasswordRule,
  createUsernameRule,
} from './rules'

interface SignUpFormValue {
  username: string
  password: string
  confirmPassword: string
}

const userStore = useUserStore()
const { gotoHome } = useGoto()

const formRef = ref<FormInst | null>(null)
const formValue = reactive<SignUpFormValue>({
  username: '',
  password: '',
  confirmPassword: '',
})

const rules = {
  username: createUsernameRule(),
  password: createPasswordRule(),
  confirmPassword: createConfirmPasswordRule(formValue),
}

function handleSignUp(e: MouseEvent) {
  e.preventDefault()
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      await userStore.signUp({
        username: formValue.username,
        password: formValue.password,
        confirmPassword: formValue.confirmPassword,
      })

      gotoHome()
    }
  })
}
</script>

<template>
  <NForm
    ref="formRef"
    :model="formValue"
    :rules="rules"
    class="flex flex-col gap-14px"
  >
    <NFormItem label="帐号" path="username" label-placement="top" class="mb-0">
      <NInput v-model:value="formValue.username" placeholder="输入帐号" size="large" />
    </NFormItem>
    <NFormItem label="密码" path="password" label-placement="top" class="mb-0">
      <NInput
        v-model:value="formValue.password"
        type="password"
        placeholder="输入密码"
        size="large"
      />
    </NFormItem>
    <NFormItem
      label="确认密码"
      path="confirmPassword"
      label-placement="top"
      class="mb-0"
    >
      <NInput
        v-model:value="formValue.confirmPassword"
        type="password"
        placeholder="确认密码"
        size="large"
      />
    </NFormItem>
    <NButton
      attr-type="button"
      type="primary"
      size="large"
      class="mt-6px h-36px w-full rounded-lg"
      @click="handleSignUp"
    >
      注册
    </NButton>
  </NForm>
</template>

<style scoped></style>
