import type { FormItemRule } from 'naive-ui'
import {
  PASSWORD_MAX,
  PASSWORD_MIN,
  USERNAME_MAX,
  USERNAME_MIN,
  validatePasswordLength,
  validatePasswordSame,
  validateUsernameLength,
} from './validator'

export function createUsernameRule() {
  return [
    {
      required: true,
      message: '请输入帐号',
      trigger: 'blur',
    },
    {
      validator(_rule: FormItemRule, value: string) {
        return validateUsernameLength(value)
      },
      message: `长度要大于等于 ${USERNAME_MIN} 小于等于 ${USERNAME_MAX}`,
      trigger: 'blur',
    },
  ]
}

export function createPasswordRule() {
  return [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur',
    },

    {
      validator(_rule: FormItemRule, value: string) {
        return validatePasswordLength(value)
      },
      message: `长度要大于等于 ${PASSWORD_MIN} 小于等于 ${PASSWORD_MAX}`,
      trigger: 'blur',
    },
  ]
}

export function createConfirmPasswordRule(formValue: { password: string }) {
  return [
    {
      required: true,
      message: '请再次输入密码',
      trigger: ['input', 'blur'],
    },
    {
      validator: (_rule: FormItemRule, value: string) => {
        return validatePasswordSame(formValue.password, value)
      },
      message: '两次密码输入不一致',
      trigger: ['blur', 'password-input'],
    },
  ]
}
