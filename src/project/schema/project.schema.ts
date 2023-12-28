import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';
@Schema()
export class Project {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'UserEntity',
  })
  users: Types.ObjectId[];

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Expense',
  })
  expenses: Types.ObjectId[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'UserEntity' })
  createdBy: Types.ObjectId;
}
export const ProjectSchema = SchemaFactory.createForClass(Project);
