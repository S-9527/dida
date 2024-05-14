import type { AxiosInstance, AxiosResponse } from 'axios'
import axios from 'axios'
import { router } from '@/router'
import { messageError, messageRedirectToSignIn } from '@/composables/message.ts'
import { checkHaveToken, getToken } from "@/utils/token.ts";

export const http: AxiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' },
})

http.interceptors.request.use(
    (config) => {
        if (checkHaveToken()) {
            config.headers.Authorization = `Bearer ${getToken()}`
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    },
)

http.interceptors.response.use(
    (response: AxiosResponse) => {
        const { code, message, data } = response.data

        if (code === 0) {
            return data
        }
        else {
            messageError(message)
            return Promise.reject(new Error(message))
        }
    },
    (error) => {
        if (error.response.status) {
            switch (error.response.status) {
                case 401:
                    messageRedirectToSignIn(router.currentRoute.value.fullPath)
                    break
            }
            return Promise.reject(error)
        }
    },
)
