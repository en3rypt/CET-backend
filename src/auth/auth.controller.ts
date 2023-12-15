import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './auth.gaurd';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  async loginUser(
    @Body()
    loginDto: LoginDto,
  ) {
    console.log(
      '🚀 ~ file: auth.controller.ts:21 ~ AuthController ~ loginDto:',
      loginDto,
    );
    const user = await this.authService.loginUser(loginDto);
    return user;
  }

  @Get()
  @UseGuards(AuthGuard)
  getHello(@Request() req): string {
    return req.user;
  }
}
