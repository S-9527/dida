import Fuse from 'fuse.js'
import { ref } from 'vue'
import { Command, useCommand } from "@/composables/command";

const { commands } = useCommand()

// 默认显示所在的命令
export const filteredCommands = ref<Command[]>()
const fuse = new Fuse(commands, {
    keys: ['name'],
})

export function useSearchCommands() {
    function searchCommands(input: string) {
        if (!input) {
            resetSearchCommands()
            return
        }

        fuse.setCollection(commands)
        filteredCommands.value = fuse.search(input).map(i => i.item)
    }

    function resetSearchCommands() {
        filteredCommands.value = commands
    }

    return {
        filteredCommands,
        searchCommands,
        resetSearchCommands,
    }
}
