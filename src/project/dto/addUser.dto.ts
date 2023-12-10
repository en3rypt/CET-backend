import { IsEmail, IsNotEmpty } from 'class-validator';

export class AddUserDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly projectId: string;
}
