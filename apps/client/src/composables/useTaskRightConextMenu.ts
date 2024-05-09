import ContextMenu from "@imengyu/vue3-context-menu";
import type { MenuOptions } from '@imengyu/vue3-context-menu'
import { useTaskStore } from "@/store";
import { useTaskStore as useNewTaskStore } from '@/store/tasks'
import { useTaskOperationMessage } from "./useTaskOperationMessage.ts";
import { h, reactive, toRefs } from "vue";

export function useTaskRightContextMenu() {
    const { moveTask } = useTaskStore();
    const { currentActiveTask, projects } = toRefs(useTaskStore());
    const { showRemoveMessage, showMoveMessage } = useTaskOperationMessage()
    const newTaskStore = useNewTaskStore()

    const moveProjects: NonNullable<MenuOptions['items']> = [
        ...getSearchMenuItem(),
        ...getMoveListProjects()
    ]

    const menuData = reactive<MenuOptions>({
        x: 0,
        y: 0,
        items: [
            {
                label: '移动到',
                children: moveProjects,
            },
            {
                label: '删除',
                onClick: () => {
                    showRemoveMessage(newTaskStore.currentActiveTask!)
                    newTaskStore.removeTask(newTaskStore.currentActiveTask!)
                },
            },
        ],
    })

    function getSearchMenuItem() {
        return [{
            label: h('input', {
                style: {
                    width: '100px',
                    height: '20px',
                    outlineColor: 'rgb(86, 125, 250)',
                },
                placeholder: '搜索',
                id: 'searchInput',
                onInput: changeInput,
            }),
            clickClose: false,
        }]
    }

    function changeInput() {
        const inputValue = (<HTMLInputElement>document.getElementById('searchInput')).value
        if (menuData.items) {
            if (!inputValue) {
                menuData.items[0].children = moveProjects
                return
            }
            menuData.items[0].children = moveProjects.filter((projectItem) => {
                if (typeof projectItem.label === 'string') {
                    return (projectItem.label as string).includes(inputValue)
                }

                return true
            })
        }
    }

    function getMoveListProjects() {
        return projects.value.map((projectItem) => {
            const isCurrentProject = currentActiveTask.value?.project!.id === projectItem.id
            return {
                label: isCurrentProject
                    ? h(
                        'span',
                        {
                            style: {
                                color: '#567dfa',
                            },
                        },
                        projectItem.name,
                    )
                    : projectItem.name,
                onClick: () => {
                    if (isCurrentProject)
                        return
                    showMoveMessage(projectItem.name)
                    moveTask(currentActiveTask.value!, projectItem.id)
                },
            }
        })
    }

    function showContextMenu(e: MouseEvent) {
        e.preventDefault();
        menuData.x = e.x
        menuData.y = e.y
        if (menuData.items) {
            menuData.items[0].children = moveProjects
        }
        ContextMenu.showContextMenu(menuData)
    }

    return {
        showContextMenu,
    };
}
