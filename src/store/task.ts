import { defineStore } from "pinia";
import { reactive, ref } from "vue";

enum TaskState {
    ACTIVE,
    COMPLETED,
    GIVE_UP,
    REMOVED,
}

export class Task {
    public title: string;
    content: string;
    project: Project;
    state: TaskState = TaskState.ACTIVE;
    constructor(title: string, content: string, project: Project) {
        this.title = title;
        this.content = content;
        this.project = project;
    }

    setState(state: TaskState) {
        this.state = state;
    }

    removeSelfFromProject() {
        this.project.removeTask(this);
    }
}

class Project {
    name: string;
    taskList: Task[];
    constructor(name: string) {
        this.name = name;
        this.taskList = [];
    }

    addTask(task: Task) {
        this.taskList.unshift(task);
    }

    removeTask(task: Task) {
        console.log("remove task");
        const index = this.taskList.indexOf(task);
        if (index !== -1) {
            this.taskList.splice(index, 1);
        }
    }
}

// mock
const projectList: Project[] = [];
const completedProject = new Project("已完成");

const data = {
    projectList: [
        {
            name: "快捷",
            taskList: [
                {
                    title: "吃饭",
                    content: "## 吃饭 \n 吃什么好呢",
                    state: TaskState.ACTIVE,
                },
                {
                    title: "睡觉",
                    content: "## 睡觉 \n 早睡早起 身体好",
                    state: TaskState.ACTIVE,
                },
                {
                    title: "写代码",
                    content: "## 写代码 \n 日常写码2个点",
                    state: TaskState.COMPLETED,
                },
            ],
        },
        {
            name: "集草器",
            taskList: [
                {
                    title: "哈哈哈",
                    content: "hahaha",
                    state: TaskState.ACTIVE,
                },
                {
                    title: "嘿嘿嘿",
                    content: "heiheihei",
                    state: TaskState.ACTIVE,
                },
            ],
        },
    ],
};

export const useTaskStore = defineStore("task", () => {
    const currentActiveTask = ref<Task | null>();
    const currentActiveProject = ref<Project>();
    const projectNames = reactive<string[]>(["快捷", "集草器"]);

    data.projectList.forEach((projectListData) => {
        const project = new Project(projectListData.name);
        projectListData.taskList.forEach(({title, content, state}) => {
            const task = new Task(title, content, project);
            switch (state) {
                case TaskState.ACTIVE:
                    project.taskList.push(task);
                    break;
                case TaskState.COMPLETED:
                    completedProject.taskList.push(task);
                    break;
            }
        });

        projectList.push(project);
    });

    currentActiveProject.value = projectList[0];
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
        if (!currentActiveTask.value) return;
        currentActiveProject.value?.removeTask(currentActiveTask.value);
        changeActiveTask(null);
    }

    function changeCurrentActiveProject(projectName: string) {
        const project = projectList.find((project) => {
            return project.name === projectName;
        });

        if (!project) return;
        currentActiveProject.value = project;

        if (projectName === "已完成") {
            currentActiveProject.value = completedProject;
        }

        changeActiveTask(null)
    }

    function setCurrentActiveTaskTitle(title: string) {
        if (currentActiveTask.value) {
            currentActiveTask.value.title = title;
        }
    }

    function completeTask(task: Task) {
        task.removeSelfFromProject()
        completedProject.addTask(task)
    }

    return {
        projectNames,
        currentActiveTask,
        currentActiveProject,
        addTask,
        completeTask,
        changeActiveTask,
        removeCurrentActiveTask,
        changeCurrentActiveProject,
        setCurrentActiveTaskTitle
    }
})