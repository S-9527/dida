import type { AxiosInstance, AxiosResponse } from 'axios'
import axios from 'axios'
import { messageError, messageRedirectToSignIn } from '@/composables/message.ts'
import { checkHaveToken, getToken } from "@/utils/token.ts";
import { goToLogin } from "@/composables/goto.ts";

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
        if (response.data.code && response.data.code !== 0) {
            messageError(response.data.message)
            return Promise.reject(response.data)
        }

        return response.data
    },
    (error) => {
        const { response } = error

        if (response && response.status) {
            switch (error.response.status) {
                case 401:
                    messageRedirectToSignIn(goToLogin)
                    break
            }
            messageError(error.response.message)
            return Promise.reject(error)
        }
    },
)
