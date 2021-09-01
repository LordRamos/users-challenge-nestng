import { IsEmail, IsInt, IsString } from 'class-validator';
import { IsUnique } from '../validators/user-custom-validator';
// Validator DTO
export class CreateUserDto {
  @IsString()
  names: string;

  @IsString()
  surnames: string;

  @IsUnique()
  @IsInt()
  ci: number;

  @IsUnique()
  @IsEmail()
  email: string;

  @IsInt()
  phoneNumber: number;
}
