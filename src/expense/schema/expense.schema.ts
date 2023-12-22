import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export enum ExpenseCategory {
    CATEGORY_1 = 'Category 1',
    CATEGORY_2 = 'Category 2',
    CATEGORY_3 = 'Category 3',
}

export type ExpenseDocument = Expense & Document;

@Schema()
export class Expense {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true, enum: ExpenseCategory })
    category: ExpenseCategory;

    @Prop()
    description?: string;

    @Prop({ required: true })
    date: string;

    @Prop({ required: true })
    amount: number;

    @Prop({ type: Types.ObjectId, required: true })
    projectId: Types.ObjectId;

    @Prop({ type: Types.ObjectId, required: true, ref: 'UserEntity' })
    createdBy: Types.ObjectId;
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);
