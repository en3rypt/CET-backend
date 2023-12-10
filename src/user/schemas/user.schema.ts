import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { hash } from 'bcrypt';
import mongoose, { Types } from 'mongoose';

@Schema()
export class UserEntity {
  @Prop()
  username: string;

  @Prop()
  email: string;

  @Prop({ select: false })
  password: string;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Project' })
  projects: Types.ObjectId[];
}

export const UserEntitySchema = SchemaFactory.createForClass(UserEntity);

UserEntitySchema.pre<UserEntity>('save', async function (next: () => void) {
  this.password = await hash(this.password, 10);
  next();
});
