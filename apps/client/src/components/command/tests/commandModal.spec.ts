import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { computed } from 'vue'
import * as misc from '@/composables/misc'
import { useCommandModalStore } from '@/store'
import { fireEvent, useSetup } from '@/tests/helper'
import { registerKeyboardShortcut } from '../commandModal'

describe('command modal', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    const { closeCommandModal } = useCommandModalStore()
    closeCommandModal()
  })
  it('should be open command modal', () => {
    const commandModalStore = useCommandModalStore()

    commandModalStore.openCommandModal()

    expect(commandModalStore.showCommandModal).toBe(true)
  })

  it('should be close command modal', () => {
    const commandModalStore = useCommandModalStore()

    commandModalStore.closeCommandModal()

    expect(commandModalStore.showCommandModal).toBe(false)
  })

  it('should be open command modal when press cmd+k on Mac', () => {
    vi.spyOn(misc, 'useIsMac').mockReturnValue(computed(() => true))
    const commandModalStore = useCommandModalStore()

    const { wrapper } = useSetup(() => {
      registerKeyboardShortcut()
    })

    fireEvent.keyDown({
      key: 'k',
      metaKey: true,
    })

    expect(commandModalStore.showCommandModal).toBe(true)

    wrapper.unmount()
  })

  it('should be open command modal when press ctrl+k on Win', () => {
    vi.spyOn(misc, 'useIsMac').mockReturnValue(computed(() => false))
    const commandModalStore = useCommandModalStore()

    const { wrapper } = useSetup(() => {
      registerKeyboardShortcut()
    })

    fireEvent.keyDown({
      key: 'k',
      ctrlKey: true,
    })

    expect(commandModalStore.showCommandModal).toBe(true)

    wrapper.unmount()
  })
})
