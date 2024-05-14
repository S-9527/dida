import { useRouter } from 'vue-router'
import { RouteNames } from "@/router/const.ts";
import { getRouterInstance } from '@/router'

export function useGoto() {
    const router = useRouter()

    const gotoHome = () => router.push({
        name: RouteNames.HOME,
    });

    const gotoSettings = () => router.push({
        name: RouteNames.SETTINGS,
    });

    const gotoSettingsTheme = () => router.push({
        name: RouteNames.SETTINGS_THEME,
    });

    return {
        gotoHome,
        gotoSettings,
        gotoSettingsTheme,
    }
}

export const GITHUB_URL = 'https://github.com/cuixueshe/dida'
export function openGithub() {
    window.open(GITHUB_URL)
}

export function goToLogin() {
  return getRouterInstance().replace({
        name: RouteNames.LOGIN,
    })
}
