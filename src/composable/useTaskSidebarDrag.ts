import { useEventListener } from '@vueuse/core'
import type { Ref } from 'vue'

const LEFT_AREA_MAX_WIDTH = 360
const RIGHT_AREA_MAX_WIDTH = 800

enum Direction {
    LEFT = 'left',
    RIGHT = 'right',
}

export function useTaskSidebarDrag(
    minWidth: number,
    leftResizeElement: Ref<HTMLDivElement | undefined>,
    rightResizeElement: Ref<HTMLDivElement | undefined>,
    boxContainerElement: Ref<HTMLDivElement | undefined>,
    leftContainerElement: Ref<HTMLDivElement | undefined>,
    rightContainerElement: Ref<HTMLDivElement | undefined>,
    leftWidthFlex: Ref<string>,
    rightWidthFlex: Ref<string>,
) {
    function getContainerHorizontalPadding(containerRef: Ref<HTMLDivElement | undefined>) {
        if (!containerRef.value) return 0
        const computedStyle = getComputedStyle(containerRef.value)
        return (
            parseFloat(computedStyle.getPropertyValue('padding-left'))
            + parseFloat(computedStyle.getPropertyValue('padding-right'))
        )
    }

    function calculateMoveDistance(
        offsetLeft: number,
        startX: number,
        endX: number,
        direction: Direction,
    ) {
        let moveDistance = offsetLeft + (endX - startX)
        if (direction === Direction.LEFT) {
            if (moveDistance < minWidth)
                moveDistance = minWidth
            if (moveDistance > LEFT_AREA_MAX_WIDTH)
                moveDistance = LEFT_AREA_MAX_WIDTH
        }
        else {
            const space
                = boxContainerElement.value!.clientWidth
                - getContainerHorizontalPadding(boxContainerElement) / 2

            if (moveDistance > space - minWidth)
                moveDistance = space - minWidth

            if (moveDistance < space - RIGHT_AREA_MAX_WIDTH)
                moveDistance = space - RIGHT_AREA_MAX_WIDTH
            moveDistance = space - moveDistance
        }
        return moveDistance
    }

    function useDividerDrag(e: MouseEvent, direction: Direction) {
        const startX = e.clientX
        let offsetLeft: number
        direction === Direction.LEFT
            ? (offsetLeft = leftResizeElement.value!.offsetLeft)
            : (offsetLeft = rightResizeElement.value!.offsetLeft)

        const cleanupMouseMove = useEventListener(
            document,
            'mousemove',
            (event: MouseEvent) => {
                document.body.style.cursor = 'ew-resize'
                const endX = event.clientX
                const moveDistance = calculateMoveDistance(
                    offsetLeft,
                    startX,
                    endX,
                    direction,
                )
                const expression = `flex: 0 0 ${moveDistance}px`

                if (direction === Direction.LEFT) {
                    leftWidthFlex.value = expression
                    leftContainerElement.value!.setAttribute('style', leftWidthFlex.value)
                }

                if (direction === Direction.RIGHT) {
                    rightWidthFlex.value = expression
                    rightContainerElement.value!.setAttribute('style', rightWidthFlex.value)
                }
            },
        )
        const cleanupMouseUp = useEventListener(document, 'mouseup', () => {
            cleanupMouseMove()
            cleanupMouseUp()
            document.body.style.cursor = 'default'
        })
    }

    function useDividerLeftDrag(e: MouseEvent) {
        useDividerDrag(e, Direction.LEFT)
    }

    function useDividerRightDrag(e: MouseEvent) {
        useDividerDrag(e, Direction.RIGHT)
    }

    return {
        useDividerLeftDrag,
        useDividerRightDrag,
        leftResizeElement,
        rightResizeElement,
        boxContainerElement,
        leftContainerElement,
        rightContainerElement,
    }
}