import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import { useContextMenuStore } from '@/store'

function createContextMenuEvent(x: number, y: number) {
  return new MouseEvent('contextmenu', { clientX: x, clientY: y })
}

describe('contextMenu store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should be closed with no options by default', () => {
    const contextMenuStore = useContextMenuStore()

    expect(contextMenuStore.open).toBe(false)
    expect(contextMenuStore.options).toEqual([])
  })

  it('should open at the cursor position', async () => {
    const contextMenuStore = useContextMenuStore()
    const options = [{ key: 'complete', label: '完成' }]

    await contextMenuStore.show(options, createContextMenuEvent(120, 340))

    expect(contextMenuStore.open).toBe(true)
    expect(contextMenuStore.x).toBe(120)
    expect(contextMenuStore.y).toBe(340)
    expect(contextMenuStore.options).toEqual(options)
  })

  it('should move the anchor and replace the options when shown again', async () => {
    const contextMenuStore = useContextMenuStore()

    await contextMenuStore.show([{ key: 'a' }], createContextMenuEvent(10, 10))
    await contextMenuStore.show([{ key: 'b' }], createContextMenuEvent(99, 88))

    expect(contextMenuStore.open).toBe(true)
    expect(contextMenuStore.x).toBe(99)
    expect(contextMenuStore.y).toBe(88)
    expect(contextMenuStore.options).toEqual([{ key: 'b' }])
  })

  it('should close', async () => {
    const contextMenuStore = useContextMenuStore()
    await contextMenuStore.show([{ key: 'a' }], createContextMenuEvent(10, 10))

    contextMenuStore.hide()

    expect(contextMenuStore.open).toBe(false)
  })
})
