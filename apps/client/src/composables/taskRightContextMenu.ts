import type { DropdownMixedOption } from 'naive-ui/es/dropdown/src/interface'
import type { Task } from '@/store'
import { Icon } from '@iconify/vue'
import { h } from 'vue'
import {
  TaskStatus,
  useContextMenuStore,
  useListProjectsStore,
  useTasksStore,
} from '@/store'
import { useTaskOperationMessage } from './taskOperationMessage'

function createMenuIcon(name: string) {
  return () => h(Icon, { icon: name, width: 15 })
}

export function useTaskRightContextMenu() {
  const tasksStore = useTasksStore()
  const listProjectsStore = useListProjectsStore()
  const contextMenuStore = useContextMenuStore()
  const {
    showCompleteMessage,
    showMoveMessage,
    showRemoveMessage,
  } = useTaskOperationMessage()

  function createCompleteOption(task: Task): DropdownMixedOption {
    if (task.status === TaskStatus.COMPLETED) {
      return {
        key: 'restore',
        label: '取消完成',
        icon: createMenuIcon('carbon-restart'),
        props: { onClick: () => tasksStore.restoreTask(task) },
      }
    }

    return {
      key: 'complete',
      label: '完成',
      icon: createMenuIcon('carbon-task-complete'),
      props: {
        onClick: () => {
          tasksStore.completeTask(task)
          showCompleteMessage(task)
        },
      },
    }
  }

  function createMoveOption(task: Task): DropdownMixedOption | undefined {
    const targets = listProjectsStore.projects.filter(
      project => project.id !== task.projectId,
    )
    if (targets.length === 0)
      return undefined

    return {
      key: 'move',
      label: '移动到',
      icon: createMenuIcon('carbon-folder-move-to'),
      children: targets.map(project => ({
        key: project.id,
        label: project.name,
        props: {
          onClick: () => {
            showMoveMessage(project.name)
            tasksStore.moveTaskToProject(task, project.id)
          },
        },
      })),
    }
  }

  function createRemoveOption(task: Task): DropdownMixedOption {
    return {
      key: 'remove',
      label: '删除',
      icon: createMenuIcon('carbon-trash-can'),
      props: {
        onClick: () => {
          showRemoveMessage(task)
          tasksStore.removeTask(task)
        },
      },
    }
  }

  function createMenuOptions(task: Task): DropdownMixedOption[] {
    const options: DropdownMixedOption[] = []
    const moveOption = createMoveOption(task)

    if (task.status !== TaskStatus.REMOVED) {
      options.push(createCompleteOption(task))
    }

    if (moveOption) {
      options.push(moveOption)
    }

    if (task.status !== TaskStatus.REMOVED) {
      options.push({ type: 'divider', key: 'divider-remove' })
      options.push(createRemoveOption(task))
    }

    return options
  }

  function showContextMenu(event: MouseEvent, task: Task) {
    event.preventDefault()
    tasksStore.changeActiveTask(task)
    contextMenuStore.show(createMenuOptions(task), event)
  }

  return {
    showContextMenu,
  }
}
