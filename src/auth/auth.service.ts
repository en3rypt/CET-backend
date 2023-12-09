import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { compare } from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/user/schemas/user.schema';
import { LoginResponse } from './dto/loginResponse.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async loginUser(loginDto: LoginDto): Promise<LoginResponse> {
    const user = await this.userService.findOne(loginDto.email);
    const isPasswordCorrect = await compare(loginDto.password, user.password);
    if (!isPasswordCorrect) {
      throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
    }
    return {
      email: user.email,
      username: user.username,
      access_token: await this.generateJwt(user),
    };
  }

  async generateJwt(user: UserEntity): Promise<string> {
    const payload = { sub: user.email, username: user.username };
    return await this.jwtService.signAsync(payload);
  }
}
