import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export interface Task {
    title: string;
}

function createTask(title: string): Task {
    return { title }
}

export const useTaskStore = defineStore("task", () => {
    const currentActiveTask = ref<Task>();
    const taskList = reactive<Task[]>([]);

    taskList.push(createTask("吃饭"));
    taskList.push(createTask("睡觉"));
    taskList.push(createTask("写代码"));

    function changeActiveTask(task: Task) {
        currentActiveTask.value = task;
    }

    function addTask(title: string) {
        const task = createTask(title);

        taskList.unshift(task);
        changeActiveTask(task);
    }

    return {
        taskList,
        currentActiveTask,
        addTask,
        changeActiveTask,
    }
})