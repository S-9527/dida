import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import type { Project, Task, Tag } from '@/service/task'
import * as taskService from '@/service/task'

const projects = reactive<Project[]>([])
const tasks = reactive<Task[]>([])
const tags = reactive<Tag[]>([])

taskService.init(projects, tasks, tags)

const currentActiveTask = ref<Task>();
const currentActiveProject = ref<Project | Tag>(projects[0]);

const projectNames = computed(() => {
    return projects.map(project => project.name)
})

async function init() {
    await taskService.loadProjects()
    await taskService.loadTags()
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

async function selectCategory(category: Project | Tag) {
    await taskService.loadTasks(category)
    currentActiveProject.value = category
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

function useTag() {
    async function addTag(tagVal: { name: string; parentTagId?: number; color: string }) {
        const tag = taskService.createTags(tagVal.name, tagVal.color, tagVal.parentTagId)
        await taskService.addTags(tag)
        await selectCategory(tag)
    }

    function editTag(tag: { id: number; name: string; parentTagId?: number; color: string }) {
        const origin = tags.find(t => t.id === tag.id)
        if (!origin) return

        taskService.updateTags({ ...tag, parentTagId: tag.parentTagId || null })
        origin.name = tag.name
        origin.color = tag.color
        origin.parentTagId = tag.parentTagId || null
    }

    function deleteTag(id: number) {
        taskService.deleteTag(id)
    }

    return {
        addTag,
        editTag,
        deleteTag
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

    function addTaskToTag(title: string) {
        if (currentActiveProject.value) {
            const task = taskService.createTask(title)
            taskService.addTask(task, undefined, [currentActiveProject.value.id])
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
        ...useTag(),
        tasks,
        projects,
        tags,
        projectNames,
        currentActiveTask,
        currentActiveProject,
        addTask,
        addTaskToTag,
        restoreTask,
        completeTask,
        changeActiveTask,
        removeTask,
        selectProject,
        selectCategory,
        init
    };
});
