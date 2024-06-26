import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class StudentsSignInRequestDto {
  @ApiProperty({ description: 'student email' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'student password' })
  @IsString()
  password: string;
}
