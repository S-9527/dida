import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import { projects as projectsData, trashProject, completedProject } from "./model";
import { Project } from "./Project";
import { Task } from "./Task";
import { TaskState } from "./const";

export const useTaskStore = defineStore("task", () => {
    const projects = reactive(projectsData)
    const currentActiveTask = ref<Task | null>();
    const currentActiveProject = ref<Project>();
    const projectNames = computed(() => {
        return projects.map(project => project.name)
    })

    currentActiveProject.value = projects[0];

    function changeActiveTask(task: Task | null) {
        currentActiveTask.value = task;
    }

    function addTask(title: string) {
        if (currentActiveProject.value) {
            const task = new Task(title, "", currentActiveProject.value);
            currentActiveProject.value?.addTask(task);
            changeActiveTask(task);
        }
    }

    function removeCurrentActiveTask() {
        if (currentActiveTask.value) {
            currentActiveProject.value?.removeTask(currentActiveTask.value);
            currentActiveTask.value?.setState(TaskState.REMOVED);
            currentActiveTask.value?.addToProject(trashProject);
        }
    }

    function changeCurrentActiveProject(projectName: string) {
        const project = projects.find((project) => {
            return project.name === projectName;
        });

        if (project){
            currentActiveProject.value = project;
        }

        if (projectName === "已完成") {
            currentActiveProject.value = completedProject;
        }

        if (projectName === "垃圾桶") {
            currentActiveProject.value = trashProject;
        }

        changeActiveTask(null);
    }

    function setCurrentActiveTaskTitle(title: string) {
        if (currentActiveTask.value) {
            currentActiveTask.value.title = title;
        }
    }

    function completeTask(task: Task) {
        task.setState(TaskState.COMPLETED);
        task.addToProject(completedProject);
    }

    function restoreTask(task: Task) {
        task.restore();
        changeActiveTask(null);
    }

    return {
        projectNames,
        currentActiveTask,
        currentActiveProject,
        addTask,
        restoreTask,
        completeTask,
        changeActiveTask,
        removeCurrentActiveTask,
        changeCurrentActiveProject,
        setCurrentActiveTaskTitle,
    };
});