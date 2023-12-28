import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from './schema/project.schema';
import { Model, Types } from 'mongoose';
import { CreateProjectDto } from './dto/createProject.dto';
import { UserService } from 'src/user/user.service';
import { ExpenseService } from 'src/expense/expense.service';

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
      users: [user.userId],
      createdBy: user.userId,
    });

    const savedProject = await project.save();
    await this.userService.addProject(user.email, savedProject._id);
    return savedProject;
  }

  async getProject(userId: string, projectId: string): Promise<any> {
    const user = await this.userService.findUserByIdWithoutProjects(userId);
    if (!user) {
      throw new UnprocessableEntityException('User does not exist');
    }
    if (!user.projects.includes(projectId)) {
      throw new NotFoundException('User is not a member of this project');
    }
    return await this.projectModel
      .findById(projectId)
      .populate('users')
      .populate('expenses');
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

  async AddExpenseToProject(
    expenseId: Types.ObjectId,
    projectId: Types.ObjectId,
  ): Promise<any> {
    return await this.projectModel.findByIdAndUpdate(projectId, {
      $push: { expenses: expenseId },
    });
  }

  // async getProjectStats(userId: string, projectId: string): Promise<any> {
  //   const user = await this.userService.findUserById(userId);
  //   if (!user) {
  //     throw new UnprocessableEntityException('User does not exist');
  //   }
  //   if (!user.projects.includes(projectId)) {
  //     throw new NotFoundException('User is not a member of this project');
  //   }
  //   const project = await this.projectModel.findById(projectId);
  //   const expenses = await this.projectModel
  //     .findById(projectId)
  //     .populate('expenses');
  //   const totalExpense = expenses.expenses.reduce(
  //     (acc, curr) => acc + curr.amount,
  //     0,
  //   );
  //   const totalUsers = project.users.length;
  //   return {
  //     totalExpense,
  //     totalUsers,
  //   };
  // }
}
