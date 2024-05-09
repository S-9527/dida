import { beforeEach, describe, expect, it, vi } from 'vitest'
import { computed } from 'vue'
import { closeCommandModal, openCommandModal, registerKeyboardShortcut, showCommandModal } from '../commandModal'
import { fireEvent, useSetup } from '@/tests/helper'
import * as misc from "@/composables/misc.ts";

describe('CommandModal', () => {
    beforeEach(() => {
        showCommandModal.value = false
    })

    it('should be open command modal', () => {
        openCommandModal()

        expect(showCommandModal.value).toBe(true)
    })
    it('should be close command modal', () => {
        openCommandModal()

        closeCommandModal()

        expect(showCommandModal.value).toBe(false)
    })

    describe('KeyboardShortcut', () => {
        it('should be open command modal when use command + k on Mac', () => {
            vi.spyOn(misc,'useIsMac').mockImplementation(() => computed(() => true))
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
