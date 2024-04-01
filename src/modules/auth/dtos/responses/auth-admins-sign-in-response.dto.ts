import { ApiProperty } from "@nestjs/swagger";

export class AdminsSignInResponseDto {
  @ApiProperty({ description: 'admin id' })
  id: string;

  @ApiProperty({ description: 'admin email' })
  email: string;

  @ApiProperty({ description: 'admin name' })
  name: string;

  @ApiProperty({ description: 'access token' })
  token: string;
}