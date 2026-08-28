import type { AxiosInstance, AxiosResponse } from 'axios'
import axios from 'axios'
import { goToLogin } from '@/composables'
import { messageError, messageRedirectToSignIn } from '@/composables/message'

export const http: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
})

http.interceptors.response.use(
  (response: AxiosResponse) => {
    const { code, message, data } = response.data
    if (code === 0) {
      return data
    }

    messageError(message)
    return Promise.reject(new Error(message))
  },
  (error) => {
    if (error.response.status) {
      handleError(error.response)
      return Promise.reject(error)
    }
  },
)

function handleError(response: AxiosResponse) {
  switch (response.status) {
    case 401:
      messageRedirectToSignIn(goToLogin)
      break
  }
}
