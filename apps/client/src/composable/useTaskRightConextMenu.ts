import ContextMenu from "@imengyu/vue3-context-menu";
import { useTaskStore } from "@/store";
import { useTaskOperationMessage } from "./useTaskOperationMessage.ts";
import { h, toRefs } from "vue";

export function useTaskRightContextMenu() {
    const { removeTask, moveTask } = useTaskStore();
    const { currentActiveTask, projects } = toRefs(useTaskStore());
    const { showRemoveMessage, showMoveMessage } = useTaskOperationMessage()

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
        ContextMenu.showContextMenu({
            x: e.x,
            y: e.y,
            items: [
                {
                    label: '移动到',
                    children: [...getMoveListProjects()],
                },
                {
                    label: "删除",
                    onClick: () => {
                        showRemoveMessage(currentActiveTask.value!)
                        removeTask(currentActiveTask.value!)
                    },
                },
            ],
        });
    }

    return {
        showContextMenu,
    };
}
