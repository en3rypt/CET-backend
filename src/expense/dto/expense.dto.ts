import { IsNotEmpty, IsOptional } from "class-validator"
import { ExpenseCategory } from "../schema/expense.schema";

export class CreateExpenseDto {
    @IsNotEmpty()
    readonly title: string;

    @IsNotEmpty()
    readonly category: ExpenseCategory;

    @IsNotEmpty()
    readonly date: Date;

    @IsOptional()
    readonly description: string;

    @IsNotEmpty()
    readonly amount: number;

    @IsNotEmpty()
    readonly projectId: string;

}