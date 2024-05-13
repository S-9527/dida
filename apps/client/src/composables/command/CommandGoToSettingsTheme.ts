import type { Command } from './index'
import { useGoto } from '@/composables/goto'

export class CommandGoToSettingsTheme implements Command {
    gotoSettingsTheme: () => void

    name = '切换皮肤'

    constructor() {
        const { gotoSettingsTheme } = useGoto()
        this.gotoSettingsTheme = gotoSettingsTheme
    }

    execute() {
        this.gotoSettingsTheme()
    }
}
