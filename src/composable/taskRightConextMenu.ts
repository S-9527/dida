import ContextMenu from "@imengyu/vue3-context-menu";
import { useTaskStore } from "@/store/task";
import { toRefs } from "vue";

export function useTaskRightContextMenu() {
    const { removeTask } = useTaskStore();
    const { currentActiveTask } = toRefs(useTaskStore());

    function showContextMenu(e: MouseEvent) {
        e.preventDefault();
        ContextMenu.showContextMenu({
            x: e.x,
            y: e.y,
            items: [
                {
                    label: "remove",
                    onClick: () => removeTask(currentActiveTask.value!),
                },
            ],
        });
    }

    return {
        showContextMenu,
    };
}