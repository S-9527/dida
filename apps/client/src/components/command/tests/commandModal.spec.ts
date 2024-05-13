import { beforeEach, describe, expect, it, vi } from 'vitest'
import { computed } from 'vue'
import { useCommandModal } from '../commandModal'
import { useSetup } from '@/tests/helper/component'
import { fireEvent } from '@/tests/helper/fireEvent'
import * as misc from "@/composables/misc.ts";

describe('CommandModal', () => {
    beforeEach(() => {
        const { closeCommandModal } = useCommandModal()
        closeCommandModal()
    })

    it('should be open command modal', () => {
        const { openCommandModal, showCommandModal } = useCommandModal()
        openCommandModal()

        expect(showCommandModal.value).toBe(true)
    })
    it('should be close command modal', () => {
        const { openCommandModal, closeCommandModal, showCommandModal } = useCommandModal()
        openCommandModal()

        closeCommandModal()

        expect(showCommandModal.value).toBe(false)
    })

    describe('KeyboardShortcut', () => {
        it('should be open command modal when use command + k on Mac', () => {
            vi.spyOn(misc,'useIsMac').mockImplementation(() => computed(() => true))
            const { registerKeyboardShortcut, showCommandModal } = useCommandModal()
            useSetup(() => {
                registerKeyboardShortcut()
            })
            // 触发键盘事件
            fireEvent.keydown({
                key: 'k',
                metaKey: true,
            })

            expect(showCommandModal.value).toBe(true)
        })
        it('should be open command modal when use ctrl + k on Win', () => {
            vi.spyOn(misc,'useIsMac').mockImplementation(() => computed(() => false))
            const { registerKeyboardShortcut, showCommandModal } = useCommandModal()
            useSetup(() => {
                registerKeyboardShortcut()
            })
            // 触发键盘事件
            fireEvent.keydown({
                key: 'k',
                ctrlKey: true,
            })

            expect(showCommandModal.value).toBe(true)
        })
    })
})
