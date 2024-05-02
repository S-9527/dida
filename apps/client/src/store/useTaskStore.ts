import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import type { Project, Task } from '@/service/task'
import * as taskService from '@/service/task'

const projects = reactive<Project[]>([])
const tasks = reactive<Task[]>([])

taskService.init(projects, tasks)

const currentActiveTask = ref<Task>();
const currentActiveProject = ref<Project>(projects[0]);

const projectNames = computed(() => {
    return projects.map(project => project.name)
})

async function init() {
    await taskService.loadProjects()
    if (projects.length === 0) return
    currentActiveProject.value = projects[0]
    await taskService.loadTasks(currentActiveProject.value)
}

function changeActiveTask(task: Task | undefined) {
    currentActiveTask.value = task
}

async function selectProject(project: Project) {
    await taskService.loadTasks(project)
    currentActiveProject.value = project
    changeActiveTask(undefined)
}

function useProject() {
    async function addProject(name: string) {
        const project = taskService.createProject(name)
        await taskService.addProject(project)
        await selectProject(project)
    }

    return {
        addProject,
    }
}

export const useTaskStore = defineStore("task", () => {
    function addTask(title: string) {
        if (currentActiveProject.value) {
            const task = taskService.createTask(title)
            taskService.addTask(task, currentActiveProject.value!.id)
            changeActiveTask(task)
        }
    }

    function removeTask(task: Task) {
        taskService.removeTask(task)
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
        ...useProject(),
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
        selectProject,
        init
    };
});
