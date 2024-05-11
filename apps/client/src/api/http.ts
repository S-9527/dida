import type { AxiosInstance, AxiosResponse } from 'axios'
import axios from 'axios'

export const http: AxiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' },
})

http.interceptors.response.use(
    (response: AxiosResponse) => {
        const { code, message, data } = response.data
        return code === 0 ? data : Promise.reject(new Error(message));
    },
    (error) => {
        return Promise.reject(error)
    },
)
