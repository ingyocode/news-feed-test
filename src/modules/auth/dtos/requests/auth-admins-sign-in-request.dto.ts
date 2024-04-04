import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class AdminsSignInRequestDto {
  @ApiProperty({ description: 'admins email' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'admins password' })
  @IsString()
  password: string;
}