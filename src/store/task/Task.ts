import { Project } from "./Project";
import { TaskState } from "./const";
import { nanoid } from "nanoid";

export class Task {
    public title: string;
    public id: string = "";
    public content: string = "";
    public project: Project | undefined;
    public state: TaskState = TaskState.ACTIVE;
    previousProject?: Project | null;

    constructor(title: string, id: string = nanoid()) {
        this.title = title;
        this.id = id;
    }

    moveToProject(project: Project) {
        this.project?.removeTask(this);
        project.addTask(this);
    }

    restore() {
        if (this.previousProject) {
            this.moveToProject(this.previousProject);
        }
    }
}