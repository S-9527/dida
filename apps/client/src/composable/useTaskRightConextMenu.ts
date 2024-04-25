import ContextMenu from "@imengyu/vue3-context-menu";
import { useTaskStore } from "@/store";
import { useTaskOperationMessage } from "./useTaskOperationMessage.ts";
import { toRefs } from "vue";

export function useTaskRightContextMenu() {
    const { removeTask } = useTaskStore();
    const { currentActiveTask } = toRefs(useTaskStore());
    const { showRemoveMessage } = useTaskOperationMessage()

    function showContextMenu(e: MouseEvent) {
        e.preventDefault();
        ContextMenu.showContextMenu({
            x: e.x,
            y: e.y,
            items: [
                {
                    label: "remove",
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