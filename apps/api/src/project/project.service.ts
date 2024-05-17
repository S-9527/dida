import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Project } from './schemas/project.schema'
@Injectable()
export class ProjectsService {
    constructor(
        @InjectModel(Project.name) private projectModel: Model<Project>,
    ) {}

    async create(project: Project): Promise<Project> {
        const createdTask = new this.projectModel(project)
        return createdTask.save()
    }

    async findAll(): Promise<Project[]> {
        return this.projectModel.find().exec()
    }

    async findOne(id: string): Promise<Project> {
        return this.projectModel.findById(id).exec()
    }
}
