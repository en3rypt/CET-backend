import { Module, forwardRef } from '@nestjs/common';
import { ExpenseController } from './expense.controller';
import { ExpenseService } from './expense.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Expense, ExpenseSchema } from './schema/expense.schema';
import { ProjectModule } from 'src/project/project.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => ProjectModule),
    MongooseModule.forFeature([{ name: Expense.name, schema: ExpenseSchema }]),
  ],
  controllers: [ExpenseController],
  providers: [ExpenseService],
  exports: [ExpenseService],
})
export class ExpenseModule {}
