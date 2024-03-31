import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class AdminsSignUpRequestDto {
  @ApiProperty({ description: 'admin email' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'admin name' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'admin password' })
  @IsString()
  password: string
}