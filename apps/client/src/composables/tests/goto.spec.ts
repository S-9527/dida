import { describe, expect, it, vi } from 'vitest'
import { RouteNames } from '@/router/const'
import { useSetup } from '@/tests/helper'
import { setupRouterMock } from '@/tests/helper/router'
import { GITHUB_URL, goToLogin, openGithub, useGoto } from '../goto'

describe('goto', () => {
  it('should be go to Settings', () => {
    const { router } = useSetup(() => {
      const { gotoSettings } = useGoto()
      gotoSettings()
    })

    expect(router.push).toBeCalledWith({ name: RouteNames.SETTINGS })
  })

  it('should be go to Home', () => {
    const { router } = useSetup(() => {
      const { gotoHome } = useGoto()
      gotoHome()
    })

    expect(router.push).toBeCalledWith({ name: RouteNames.HOME })
  })

  it('should be go to SettingsTheme', () => {
    const { router } = useSetup(() => {
      const { gotoSettingsTheme } = useGoto()
      gotoSettingsTheme()
    })

    expect(router.push).toBeCalledWith({ name: RouteNames.SETTINGS_THEME })
  })

  it('should be open github url', () => {
    window.open = vi.fn()

    openGithub()

    expect(window.open).toBeCalledWith(GITHUB_URL)
  })

  it('should be go to login', async () => {
    const router = setupRouterMock()
    goToLogin()
    expect(router.replace).toBeCalledWith({ name: RouteNames.LOGIN })
  })
})
