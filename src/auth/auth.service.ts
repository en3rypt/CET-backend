import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { compare } from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { LoginResponse } from './dto/loginResponse.dto';
import { JwtService } from '@nestjs/jwt';

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
      id: user._id,
      email: user.email,
      username: user.username,
    };
  }

  async login(user: any) {
    const payload = { id: user.id, email: user.email, username: user.username };
    return {
      access_token: this.jwtService.sign(payload),
      username: user.username,
      email: user.email,
      id: user.id,
    };
  }
}
