import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtConfig } from './config/jwt.config';

@Module({
  imports: [forwardRef(() => UserModule), JwtModule.registerAsync(JwtConfig)],
  controllers: [AuthController],
  providers: [AuthService, JwtService],
  exports: [JwtService],
})
export class AuthModule {}
