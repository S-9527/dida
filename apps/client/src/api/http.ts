import type { AxiosInstance, AxiosResponse } from 'axios'
import axios from 'axios'

export const http: AxiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' },
})

http.interceptors.response.use(
    (response: AxiosResponse) => {
        return response.data
    },
    (error) => {
        return Promise.reject(error)
    },
)
