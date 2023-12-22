import { Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Expense } from './schema/expense.schema';
import { Model } from 'mongoose';
import { CreateExpenseDto } from './dto/expense.dto';
import { ProjectService } from 'src/project/project.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ExpenseService {
    constructor(
        @InjectModel(Expense.name)
        private expenseModel: Model<Expense>,
        private readonly  projectService: ProjectService,
        private readonly userService: UserService,
    ) {}

    async createExpense(expense: CreateExpenseDto, userData: any): Promise<Expense> {
        const project = await this.projectService.getProject(expense.projectId);
        const user = await this.userService.findUserById(userData.userId);
        if(!user.projects.includes(expense.projectId)){
            throw new UnauthorizedException('User is not a member of this project');
        }
        if(!project || !user){
            throw new UnprocessableEntityException('Project does not exist');
        }
        const createdExpense = new this.expenseModel({...expense, createdBy: user._id});
        const updatedProject = await this.projectService.AddExpenseToProject(createdExpense._id, project._id);
        if(!updatedProject){
            throw new UnprocessableEntityException('Could not update project');
        }
        return createdExpense.save();
    }

    async getExpenses(): Promise<Expense[]> {
        return this.expenseModel.find();
    }

    async getExpense(id: string): Promise<Expense> {
        return this.expenseModel.findById(id);
    }

    async updateExpense(id: string, expense: Expense): Promise<Expense> {
        return this.expenseModel.findByIdAndUpdate(id, expense, { new: true });
    }

    // async deleteExpense(id: string): Promise<Expense> {
    //     return this.expenseModel.findByIdAndRemove(id);
    // }

    async deleteAllExpenses(): Promise<any> {
        return this.expenseModel.deleteMany({});
    }

    async getExpensesByProject(projectId: string): Promise<Expense[]> {
        return this.expenseModel.find({ project: projectId });
    }

    async getExpensesByUser(userId: string): Promise<Expense[]> {
        return this.expenseModel.find({ user: userId });
    }

    async getExpensesByProjectAndUser(
        projectId: string,
        userId: string,
    ): Promise<Expense[]> {
        return this.expenseModel.find({ project: projectId, user: userId });
    }

    async getExpensesByDate(date: Date): Promise<Expense[]> {
        return this.expenseModel.find({ date: date });
    }

    async getExpensesByCategory(category: string): Promise<Expense[]> {
        return this.expenseModel.find({ category: category });
    }

    async getExpensesByProjectAndDate(
        projectId: string,
        date: Date,
    ): Promise<Expense[]> {
        return this.expenseModel.find({ project: projectId, date: date });
    }

    async getExpensesByProjectAndCategory(
        projectId: string,
        category: string,
    ): Promise<Expense[]> {
        return this.expenseModel.find({ project: projectId, category: category });
    }

    async getExpensesByUserAndDate(
        userId: string,
        date: Date,
    ): Promise<Expense[]> {
        return this.expenseModel.find({ user: userId, date: date });
    }

    async getExpensesByUserAndCategory(
        userId: string,
        category: string,
    ): Promise<Expense[]> {
        return this.expenseModel.find({ user: userId, category: category });
    }

    async getExpensesByProjectAndUserAndDate(
        projectId: string,
        userId: string,
        date: Date,
    ): Promise<Expense[]> {
        return this.expenseModel.find({
            project: projectId,
            user: userId,
            date: date,
        });
    }

    async getExpensesByProjectAndUserAndCategory(
        projectId: string,
        userId: string,
        category: string,
    ): Promise<Expense[]> {
        return this.expenseModel.find({
            project: projectId,
            user: userId,
            category: category,
        });
    }

    async getExpensesByDateAndCategory(
        date: Date,
        category: string,
    ): Promise<Expense[]> {
        return this.expenseModel.find({ date: date, category: category });
    }

    async getExpensesByProjectAndDateAndCategory(
        projectId: string,
        date: Date,
        category: string,
    ): Promise<Expense[]> {
        return this.expenseModel.find({
            project: projectId,
            date: date,
            category: category,
        });
    }

    async getExpensesByUserAndDateAndCategory(
        userId: string,
        date: Date,
        category: string,
    ): Promise<Expense[]> {
        return this.expenseModel.find({
            user: userId,
            date: date,
            category: category,
        });
    }

    async getExpensesByProjectAndUserAndDateAndCategory(
        projectId: string,
        userId: string,
        date: Date,
        category: string,
    ): Promise<Expense[]> {
        return this.expenseModel.find({
            project: projectId,
            user: userId,
            date: date,
            category: category,
        });
    }

    async getExpensesByDateRange(
        startDate: Date,
        endDate: Date,
    ): Promise<Expense[]> {
        return this.expenseModel.find({
            date: { $gte: startDate, $lte: endDate },
        });
    }

    async getExpensesByProjectAndDateRange(
        projectId: string,
        startDate: Date,
        endDate: Date,
    ): Promise<Expense[]> {
        return this.expenseModel.find({
            project: projectId,
            date: { $gte: startDate, $lte: endDate },
        });
    }

    async getExpensesByUserAndDateRange(
        userId: string,
        startDate: Date,
        endDate: Date,
    ): Promise<Expense[]> {
        return this.expenseModel.find({
            user: userId,
            date: { $gte: startDate, $lte: endDate },
        });
    }

    async getExpensesByProjectAndUserAndDateRange(
        projectId: string,
        userId: string,
        startDate: Date,
        endDate: Date,
    ): Promise<Expense[]> {
        return this.expenseModel.find({
            project: projectId,
            user: userId,
            date: { $gte: startDate, $lte: endDate },
        });
    }

    async getExpensesByCategoryAndDateRange(
        category: string,
        startDate: Date,
        endDate: Date,
    ): Promise<Expense[]> {
        return this.expenseModel.find({
            category: category,
            date: { $gte: startDate, $lte: endDate },
        });
    }

    async getExpensesByProjectAndCategoryAndDateRange(
        projectId: string,
        category: string,
        startDate: Date,
        endDate: Date,
    ): Promise<Expense[]> {
        return this.expenseModel.find({
            project: projectId,
            category: category,
            date: { $gte: startDate, $lte: endDate },
        });
    }

    async getExpensesByUserAndCategoryAndDateRange(
        userId: string,
        category: string,
        startDate: Date,
        endDate: Date,
    ): Promise<Expense[]> {
        return this.expenseModel.find({
            user: userId,
            category: category,
            date: { $gte: startDate, $lte: endDate },
        });
    }

    async getExpensesByProjectAndUserAndCategoryAndDateRange(
        projectId: string,
        userId: string,
        category: string,
        startDate: Date,
        endDate: Date,
    ): Promise<Expense[]> {
        return this.expenseModel.find({
            project: projectId,
            user: userId,
            category: category,
            date: { $gte: startDate, $lte: endDate },
        });
    }


}
