import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { useContextMenuStore } from '@/store'
import ContextMenu from '../ContextMenu.vue'

function createContextMenuEvent(x: number, y: number) {
  return new MouseEvent('contextmenu', { clientX: x, clientY: y })
}

describe('context menu', () => {
  it('should render the options at the cursor position when the store opens', async () => {
    const pinia = createPinia()
    const contextMenuStore = useContextMenuStore(pinia)
    const wrapper = mount(ContextMenu, { global: { plugins: [pinia] } })

    await contextMenuStore.show(
      [
        { key: 'complete', label: '完成' },
        { type: 'divider', key: 'divider-remove' },
        { key: 'remove', label: '删除' },
      ],
      createContextMenuEvent(120, 340),
    )
    await nextTick()

    const anchor = document.body.querySelector<HTMLElement>('div.fixed.h-0.w-0')
    expect(anchor?.style.left).toBe('120px')
    expect(anchor?.style.top).toBe('340px')

    const text = document.body.textContent ?? ''
    expect(text).toContain('完成')
    expect(text).toContain('删除')

    wrapper.unmount()
  })

  it('should hide the menu when the store closes', async () => {
    const pinia = createPinia()
    const contextMenuStore = useContextMenuStore(pinia)
    const wrapper = mount(ContextMenu, { global: { plugins: [pinia] } })

    expect(document.body.textContent).not.toContain('完成')

    await contextMenuStore.show(
      [{ key: 'complete', label: '完成' }],
      createContextMenuEvent(120, 340),
    )
    await nextTick()
    expect(document.body.textContent).toContain('完成')

    contextMenuStore.hide()
    await nextTick()

    wrapper.unmount()
  })
})
