import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from './schema/project.schema';
import { Model, Types } from 'mongoose';
import { CreateProjectDto } from './dto/createProject.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<Project>,
    private readonly userService: UserService,
  ) {}

  async createProject(
    createProjectDto: CreateProjectDto,
    user: any,
  ): Promise<Project> {
    const project = new this.projectModel({
      ...createProjectDto,
      users: [user._id],
    });
    const savedProject = await project.save();
    await this.userService.addProject(user.email, savedProject._id);
    return savedProject;
  }

  async addUserToProject(email: string, projectId: string): Promise<any> {
    const user = await this.userService.findOne(email);
    if (!user) {
      throw new NotFoundException();
    }
    await this.userService.addProject(
      user.email,
      new Types.ObjectId(projectId),
    );
    return await this.projectModel.findByIdAndUpdate(projectId, {
      $push: { users: (user as any)._id },
    });
  }
}
