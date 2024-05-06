import { useRouter } from 'vue-router'

export function useGoto() {
    const router = useRouter()

    const gotoHome = () => router.push({
        name: 'Home',
    });

    const gotoSettings = () => router.push({
        name: 'Settings',
    });

    const gotoGithub = () => {
        window.open('https://github.com/cuixueshe/dida')
    };

    return {
        gotoHome,
        gotoSettings,
        gotoGithub,
    }
}
