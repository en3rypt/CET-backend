import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UserEntity } from './schemas/user.schema';
import mongoose, { Model } from 'mongoose';
import { UserResponse } from './types/userResponse.type';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserEntity.name)
    private userModel: Model<UserEntity>,
  ) {}
  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = await this.userModel.findOne({ email: createUserDto.email });
    if (user) {
      throw new HttpException(
        'Email already registered',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findOne(email: string): Promise<UserEntity> {
    const user = await this.userModel
      .findOne({ email: email })
      .select('+password');
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    return user;
  }

  async addProject(
    email: string,
    projectId: mongoose.Types.ObjectId,
  ): Promise<any> {
    return await this.userModel.updateOne(
      { email: email },
      { $push: { projects: projectId } },
    );
  }
  buildUserResponse(userEntity: UserEntity): UserResponse {
    return {
      username: userEntity.username,
      email: userEntity.email,
      projects: userEntity.projects,
    };
  }
}
