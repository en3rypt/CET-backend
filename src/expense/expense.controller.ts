import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateExpenseDto } from './dto/expense.dto';

@Controller('expense')
export class ExpenseController {
    constructor(
        private expenseService: ExpenseService
    ){}

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async createExpense(
        @Request() req,
        @Body() expenseDto: CreateExpenseDto) {
        return this.expenseService.createExpense(expenseDto,req.user);
    }
}
