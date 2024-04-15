// 这个文件是纯数据层
import { fetchData } from "./data";
import { Project } from "./Project";
import { Task } from "./Task";
import { TaskState } from "./const";

// 1. 先请求后端接口获取数据  这里暂时使用 fetchData 来模拟后端返回的数据
// 2. 基于数据构建 model 层
export const projects: Project[] = [];

// 完成的任务列表
export const completedProject = new Project("已完成");
// 删除的任务列表
export const trashProject = new Project("垃圾桶");

// 基于后端返回的数据做初始化
fetchData.projectList.forEach((projectListData) => {
    const project = new Project(projectListData.name);
    projectListData.taskList.forEach(({ title, content, state }) => {
        const task = new Task(title, content, project);
        switch (state) {
            case TaskState.ACTIVE:
                task.addToProject(project)
                break;
            case TaskState.COMPLETED:
                task.previousState = TaskState.ACTIVE
                task.setState(TaskState.COMPLETED)
                task.addToProject(completedProject)
                break;
        }
    });

    projects.push(project);
});

fetchData.trash.taskList.forEach(({ title, content }) => {
    const task = new Task(title, content, trashProject);
    task.setState(TaskState.REMOVED);
    trashProject.addTask(task);
});