import { UserEntity } from '../schemas/user.schema';

export type UserResponse = Omit<UserEntity, 'password'>;
