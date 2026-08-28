import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createRouterMock } from 'vue-router-mock'
import { markAnonymous, markAuthenticated } from '@/utils/token'
import { RouteNames } from '../const'
import { routes, setupRouterGuard } from '../index'

describe('router ', () => {
  beforeEach(() => {
    markAnonymous()
  })

  describe('requires auth', async () => {
    it('go to task page when authenticated', async () => {
      markAuthenticated()

      const router = createRouterMock({
        spy: {
          create: fn => vi.fn(fn),
          reset: spy => spy.mockClear(),
        },
        useRealNavigation: true,
        routes,
      })

      setupRouterGuard(router)

      await router.push({ name: RouteNames.TASK })

      expect(router.currentRoute.value.name).toBe(RouteNames.TASK)
    })

    it('go to login page when anonymous', async () => {
      vi.useFakeTimers()

      const router = createRouterMock({
        spy: {
          create: fn => vi.fn(fn),
          reset: spy => spy.mockClear(),
        },
        useRealNavigation: true,
        routes,
      })

      setupRouterGuard(router)

      router.push({ name: RouteNames.TASK })
      await vi.runAllTimersAsync()

      expect(router.currentRoute.value.name).toBe(RouteNames.LOGIN)
    })
  })

  it('go to login page when do not requires auth', async () => {
    const router = createRouterMock({
      spy: {
        create: fn => vi.fn(fn),
        reset: spy => spy.mockClear(),
      },
      useRealNavigation: true,
      routes,
    })

    setupRouterGuard(router)

    await router.push({ name: RouteNames.LOGIN })

    expect(router.currentRoute.value.name).toBe(RouteNames.LOGIN)
  })
})
