import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { projects as projectsData, trashProject, completedProject, findProjectByName } from "./model";
import { Project } from "./Project";
import { Task } from "./Task";
import { SpecialProjectNames } from "./const";

export const useTaskStore = defineStore("task", () => {
    const projects = ref<Project[]>(projectsData)
    const currentActiveTask = ref<Task | null>();
    const currentActiveProject = ref<Project>();
    const projectNames = computed(() => {
        return projects.value.map(project => project.name)
    })

    currentActiveProject.value = projects.value[0];

    function changeActiveTask(task: Task | null) {
        currentActiveTask.value = task;
    }

    function addTask(title: string) {
        if (currentActiveProject.value) {
            const task = new Task(title);
            currentActiveProject.value?.addTask(task);
            changeActiveTask(task);
        }
    }

    function putTaskToTrash(task: Task) {
        task.moveToProject(trashProject)
    }

    function changeCurrentActiveProject(projectName: string) {
        changeActiveTask(null);
        currentActiveProject.value = findProjectByName(projectName)
    }

    function completeTask(task: Task) {
        task.moveToProject(completedProject);
    }

    function restoreTask(task: Task) {
        task.restore();
        changeActiveTask(null);
    }

    function shouldShowTodoAdd() {
        const name = currentActiveProject.value?.name
        return (
            name !== (SpecialProjectNames.Complete as string) &&
            name !== SpecialProjectNames.Trash
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
        putTaskToTrash,
        changeCurrentActiveProject,
    };
});