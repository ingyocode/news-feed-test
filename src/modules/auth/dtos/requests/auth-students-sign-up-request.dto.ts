import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class StudentsSignUpRequestDto {
  @ApiProperty({ description: 'student email' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'student name' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'student password' })
  @IsString()
  password: string;
}
