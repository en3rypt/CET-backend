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
    console.log(
      '🚀 ~ file: auth.service.ts:18 ~ AuthService ~ loginUser ~ user:',
      user,
    );
    const isPasswordCorrect = await compare(loginDto.password, user.password);
    console.log(
      '🚀 ~ file: auth.service.ts:23 ~ AuthService ~ loginUser ~ isPasswordCorrect:',
      isPasswordCorrect,
    );
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
    console.log(
      '🚀 ~ file: auth.service.ts:40 ~ AuthService ~ generateJwt ~ payload:',
      payload,
    );
    return await this.jwtService.signAsync(payload);
  }
}
