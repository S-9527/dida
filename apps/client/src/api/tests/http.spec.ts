import { beforeEach, describe, expect, it, vi } from 'vitest'
import MockAdapter from 'axios-mock-adapter'
import { http } from '../http'
import { messageError, messageRedirectToSignIn } from '@/composables/message'
import { setToken } from '@/utils/token'

vi.mock('@/composables/message')

const mock: MockAdapter = new MockAdapter(http)

function mockReply(statusCode: number, response?: object): void {
    mock.onGet('/tasks').reply(statusCode, response ?? {})
}

function fetchTasks() {
    return http.get('/tasks')
}

describe('http', () => {
    beforeEach(() => {
        vi.clearAllMocks()
        mock.reset()
    })

    it('should set headers Authorization when token exist', async () => {
        const token = 'Authorization'
        setToken(token)
        mockReply(200)

        await fetchTasks()

        expect(mock.history.get[0].headers?.Authorization).toBe(`Bearer ${token}`)
    })

    it('should return data of the response when code is 0', async () => {
        const data = [{ name: '吃饭' }]
        mockReply(200, data)

        const result = await fetchTasks()

        expect(result).toEqual(data)
    })

    it('should throw an error when code is not 0', async () => {
        const message = 'an error'

        mockReply(200, { code: -1, message })

        await expect(() => fetchTasks()).rejects.toThrowError(message)
        expect(messageError).toBeCalledWith(message)
    })

    it('should redirect to signing when http code is 401', async () => {
        mockReply(401)

        await expect(() => http.get('/tasks')).rejects.toThrow()
        expect(messageRedirectToSignIn).toBeCalled()
    })
})
