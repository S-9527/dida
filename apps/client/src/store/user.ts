import type { UserResponse } from '@/api/types'
import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { fetchSignIn, fetchSignOut, fetchSignUp } from '@/api/user'
import { markAnonymous, markAuthenticated } from '@/utils/token'

interface User {
  username: string
  nickname: string
}

export const useUserStore = defineStore('user', () => {
  const user = reactive<User>({
    username: '',
    nickname: '',
  })

  function setupUser(userResponse: UserResponse) {
    user.username = userResponse.username
    user.nickname = userResponse.username

    markAuthenticated()
  }

  async function logout() {
    await fetchSignOut()
    user.username = ''
    user.nickname = ''
    markAnonymous()
  }

  async function signIn(username: string, password: string) {
    const userResponse = await fetchSignIn(username, password)
    setupUser(userResponse)
  }

  async function signUp({
    username,
    password,
    confirmPassword,
  }: {
    username: string
    password: string
    confirmPassword: string
  }) {
    const userResponse = await fetchSignUp({
      username,
      password,
      confirmPassword,
    })
    setupUser(userResponse)
  }

  return {
    user,
    signIn,
    signUp,
    logout,
  }
})
