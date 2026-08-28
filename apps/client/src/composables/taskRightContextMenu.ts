import type { MenuItem, MenuOptions } from '@imengyu/vue3-context-menu'
import ContextMenu from '@imengyu/vue3-context-menu'
import { toRefs } from 'vue'
import { useListProjectsStore, useTasksStore } from '@/store'
import { useTaskOperationMessage } from './taskOperationMessage'

export function useTaskRightContextMenu() {
  const { moveTaskToProject, removeTask } = useTasksStore()
  const { currentActiveTask } = toRefs(useTasksStore())
  const { showRemoveMessage, showMoveMessage } = useTaskOperationMessage()
  const listProjectsStore = useListProjectsStore()

  function createMenuData(x: number, y: number): MenuOptions {
    function createMoveItem(): MenuItem {
      function getMoveListProjects() {
        return listProjectsStore.projects
          .filter((project) => {
            return currentActiveTask?.value!.projectId !== project.id
          })
          .map((project) => {
            return {
              label: project.name,
              onClick: () => {
                showMoveMessage(project.name)
                moveTaskToProject(currentActiveTask.value!, project.id)
              },
            }
          })
      }

      return {
        label: '移动到',
        children: [...getMoveListProjects()],
      }
    }

    function createRemoveItem(): MenuItem {
      return {
        label: '删除',
        onClick: () => {
          showRemoveMessage(currentActiveTask.value!)
          removeTask(currentActiveTask.value!)
        },
      }
    }

    return {
      x,
      y,
      items: [createMoveItem(), createRemoveItem()],
    }
  }

  function showContextMenu(e: MouseEvent) {
    e.preventDefault()
    ContextMenu.showContextMenu(createMenuData(e.x, e.y))
  }

  return {
    showContextMenu,
  }
}
