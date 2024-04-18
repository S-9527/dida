import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import type { Project, Task } from '@/service/task'
import * as taskService from '@/service/task'

export const useTaskStore = defineStore("task", () => {
    const projects = reactive(taskService.projects)
    const currentActiveTask = ref<Task>();
    const currentActiveProject = ref<Project | undefined>(projects[0]);

    const projectNames = computed(() => {
        return projects.map(project => project.name)
    })

    function addTask(title: string) {
        const task = taskService.createTask(title)
        taskService.addTask(task, currentActiveProject.value!)
        changeActiveTask(task)
    }

    function changeActiveTask(task: Task | undefined) {
        currentActiveTask.value = task
    }

    function removeTask(task: Task) {
        taskService.removeTask(task)
        changeActiveTask(undefined)
    }

    function changeCurrentActiveProject(projectName: string) {
        currentActiveProject.value = taskService.findProjectByName(projectName)
        changeActiveTask(undefined);
    }

    function completeTask(task: Task) {
        taskService.completeTask(task)
        changeActiveTask(undefined)
    }

    function restoreTask(task: Task) {
        taskService.restoreTask(task);
        changeActiveTask(undefined);
    }

    return {
        projectNames,
        currentActiveTask,
        currentActiveProject,
        addTask,
        restoreTask,
        completeTask,
        changeActiveTask,
        removeTask,
        changeCurrentActiveProject,
    };
});