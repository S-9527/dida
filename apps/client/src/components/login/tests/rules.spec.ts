import { describe, expect, it } from 'vitest'
import {
  createConfirmPasswordRule,
  createPasswordRule,
  createUsernameRule,
} from '../rules'

describe('rules', () => {
  it('create username rules', () => {
    expect(createUsernameRule()).toMatchInlineSnapshot(`
      [
        {
          "message": "请输入帐号",
          "required": true,
          "trigger": "blur",
        },
        {
          "message": "长度要大于等于 3 小于等于 25",
          "trigger": "blur",
          "validator": [Function],
        },
      ]
    `)
  })

  it('create createPasswordRule rules ', () => {
    expect(createPasswordRule()).toMatchInlineSnapshot(`
      [
        {
          "message": "请输入密码",
          "required": true,
          "trigger": "blur",
        },
        {
          "message": "长度要大于等于 6 小于等于 30",
          "trigger": "blur",
          "validator": [Function],
        },
      ]
    `)
  })

  it('create createConfirmPasswordRule rules ', () => {
    expect(createConfirmPasswordRule({ password: '' })).toMatchInlineSnapshot(`
      [
        {
          "message": "请再次输入密码",
          "required": true,
          "trigger": [
            "input",
            "blur",
          ],
        },
        {
          "message": "两次密码输入不一致",
          "trigger": [
            "blur",
            "password-input",
          ],
          "validator": [Function],
        },
      ]
    `)
  })
})
