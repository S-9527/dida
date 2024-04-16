import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import {
    addTaskToCompleteProject,
    addTaskToProject, findProjectByName,
    projects as projectListData,
    removeTaskToTrashProject, SpecialProjectNames
} from "./project";
import { Project } from "./project";
import { Task, restoreTask as restoreTaskHandler, createTask } from "./task";

export const useTaskStore = defineStore("task", () => {
    const projects = reactive(projectListData)
    const currentActiveTask = ref<Task>();
    const currentActiveProject = ref<Project | undefined>();
    const projectNames = computed(() => {
        return projects.map(project => project.name)
    })

    function addTask(title: string) {
        const task = createTask(title)
        addTaskToProject(task, currentActiveProject.value!)
        changeActiveTask(task)
    }

    function changeActiveTask(task: Task | undefined) {
        currentActiveTask.value = task
    }

    function removeTask(task: Task) {
        removeTaskToTrashProject(task)
        changeActiveTask(undefined)
    }

    function changeCurrentActiveProject(projectName: string) {
        changeActiveTask(undefined);
        currentActiveProject.value = findProjectByName(projectName)
    }

    function completeTask(task: Task) {
        addTaskToCompleteProject(task)
        changeActiveTask(undefined)
    }

    function restoreTask(task: Task) {
        restoreTaskHandler(task);
        changeActiveTask(undefined);
    }

    function shouldShowTodoAdd() {
        const name = currentActiveProject.value?.name
        return (
            name !== (SpecialProjectNames.Complete as string) &&
            name !== SpecialProjectNames.Trash &&
            name !== SpecialProjectNames.Failed &&
            name !== SpecialProjectNames.Abstract
        )
    }

    return {
        projectNames,
        currentActiveTask,
        currentActiveProject,
        addTask,
        restoreTask,
        completeTask,
        shouldShowTodoAdd,
        changeActiveTask,
        removeTask,
        changeCurrentActiveProject,
    };
});