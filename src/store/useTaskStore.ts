import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import type { Project, Task } from '@/service/task'
import * as taskService from '@/service/task'

const projects = reactive<Project[]>([])
const tasks = reactive<Task[]>([])
const currentActiveTask = ref<Task>();
const currentActiveProject = ref<Project | undefined>(projects[0]);

const projectNames = computed(() => {
    return projects.map(project => project.name)
})

export async function initTask() {
    taskService.init(projects, tasks)
    await taskService.loadProjects()
    currentActiveProject.value = projects[0]
    if (currentActiveProject.value) {
        await taskService.loadTasks(currentActiveProject.value)
    }
}

export const useTaskStore = defineStore("task", () => {
    function addTask(title: string) {
        if (currentActiveProject.value) {
            const task = taskService.createTask(title)
            taskService.addTask(task, currentActiveProject.value?.id!)
            changeActiveTask(task)
        }
    }

    function changeActiveTask(task: Task | undefined) {
        currentActiveTask.value = task
    }

    function removeTask(task: Task) {
        taskService.removeTask(task)
        changeActiveTask(undefined)
    }
    async function selectProject(project: Project) {
        await taskService.loadTasks(project)
        changeActiveTask(undefined)
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
        tasks,
        projects,
        projectNames,
        currentActiveTask,
        currentActiveProject,
        addTask,
        restoreTask,
        completeTask,
        changeActiveTask,
        removeTask,
        selectProject
    };
});
