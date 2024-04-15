// 这个文件是纯数据层
import { fetchData } from "./data";
import { Project } from "./Project";
import { Task } from "./Task";
import { TaskState, SpecialProjectNames } from "./const";

// 1. 先请求后端接口获取数据  这里暂时使用 fetchData 来模拟后端返回的数据
// 2. 基于数据构建 model 层
export const projects: Project[] = [];

// 完成的任务列表
export const completedProject = new Project(
    SpecialProjectNames.Complete,
    TaskState.COMPLETED,
)
// 删除的任务列表
export const trashProject = new Project(
    SpecialProjectNames.Trash,
    TaskState.REMOVED,
)

// 基于后端返回的数据做初始化
fetchData.projectList.forEach((projectListData) => {
    const project = new Project(projectListData.name);
    projectListData.tasks.forEach(({ title, content, state, id }) => {
        const task = new Task(title, id);
        task.content = content;
        switch (state) {
            case TaskState.ACTIVE:
                project.addTask(task);
                break;
            case TaskState.COMPLETED:
                task.previousProject = project
                completedProject.addTask(task)
                break;
        }
    });

    projects.push(project);
});

fetchData.trash.tasks.forEach(({ title, content, id }) => {
    const task = new Task(title, id);
    task.content = content;
    task.state = TaskState.REMOVED;
    trashProject.addTask(task);
});

export function findProjectByName(projectName: string) {
    switch (projectName) {
        case SpecialProjectNames.Complete:
            return completedProject
        case SpecialProjectNames.Trash:
            return trashProject
        default: {
            const project = projects.find((project) => project.name === projectName)
            if (project) return project
        }
    }
}