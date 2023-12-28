import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  Get,
  Param,
} from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateExpenseDto } from './dto/expense.dto';

@Controller('expense')
export class ExpenseController {
  constructor(private expenseService: ExpenseService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createExpense(@Request() req, @Body() expenseDto: CreateExpenseDto) {
    return this.expenseService.createExpense(expenseDto, req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/:projectId/stats')
  async getProjectStats(@Request() req, @Param('projectId') projectId: string) {
    return this.expenseService.getProjectTotalExpenses(projectId);
  }
}
