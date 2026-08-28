import type { Ref } from 'vue'
import { computed, onMounted, ref } from 'vue'
import { useDrag } from './drag'

type PanelSide = 'left' | 'right'

interface ResizePanelOptions {
  side: PanelSide
  minWidth: number
  maxWidth: number
}

const DEFAULT_PANEL_WIDTH = 240

export function useResizePanel(
  el: Ref<HTMLDivElement | undefined>,
  { side, minWidth, maxWidth }: ResizePanelOptions,
) {
  const width = ref(DEFAULT_PANEL_WIDTH)
  const widthStyle = computed(() => `flex: 0 0 ${width.value}px`)

  onMounted(() => {
    const panelEl = el.value
    if (!panelEl)
      return

    const handleX = panelEl.getBoundingClientRect().x

    // The cursor range is derived from the width bounds, mirrored per side:
    // a left panel widens when the cursor moves right, a right panel narrows.
    const moveRange: [number, number]
      = side === 'left'
        ? [handleX - (DEFAULT_PANEL_WIDTH - minWidth), handleX + (maxWidth - DEFAULT_PANEL_WIDTH)]
        : [handleX - (maxWidth - DEFAULT_PANEL_WIDTH), handleX + (DEFAULT_PANEL_WIDTH - minWidth)]

    useDrag({
      el: panelEl,
      moveRange,
      onMove(moveDistance) {
        width.value += side === 'left' ? moveDistance : -moveDistance
      },
    })
  })

  return { widthStyle }
}
