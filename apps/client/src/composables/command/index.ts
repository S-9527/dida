import { CommandGoToHome } from './CommandGoToHome.ts'
import { CommandGoToSettingsTheme } from './CommandGoToSettingsTheme.ts'
export interface Command {
    name: string
    execute: () => void
}

const commands: Command[] = []

export function useCommand() {
    function initCommands() {
        commands.push(new CommandGoToHome())
        commands.push(new CommandGoToSettingsTheme())
    }

    return {
        commands,
        initCommands,
    }
}
