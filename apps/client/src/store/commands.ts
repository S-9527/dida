import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useGoto } from '@/composables/goto'

export interface Command {
  name: string
  execute: () => void
}

class CommandGoToHome implements Command {
  name = '前往主页'
  private gotoHome: () => void

  constructor() {
    // 当 command 的逻辑依赖于 vue setup 的话, 必须在构造函数中获取
    // 比如这里依赖于 useGoto 而  useGoto 依赖于 useRouter .
    // useRouter 必须在 setup 中调用
    const { gotoHome } = useGoto()
    this.gotoHome = gotoHome
  }

  execute() {
    this.gotoHome()
  }
}

class CommandGoToSettingsTheme implements Command {
  name = '切换皮肤'
  private gotoSettingsTheme: () => void

  constructor() {
    const { gotoSettingsTheme } = useGoto()
    this.gotoSettingsTheme = gotoSettingsTheme
  }

  execute() {
    this.gotoSettingsTheme()
  }
}

export const useCommandsStore = defineStore('commands', () => {
  const commands = ref<Command[]>([])

  function initCommands() {
    commands.value = [new CommandGoToHome(), new CommandGoToSettingsTheme()]
  }

  function resetCommand() {
    commands.value = []
  }

  function addCommand(command: Command) {
    commands.value.push(command)
  }

  return {
    commands,
    initCommands,
    resetCommand,
    addCommand,
  }
})
