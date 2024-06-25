import { ApiProperty } from '@nestjs/swagger';

export class StudentsSignInResponseDto {
  @ApiProperty({ description: 'student id' })
  id: string;

  @ApiProperty({ description: 'student email' })
  email: string;

  @ApiProperty({ description: 'student name' })
  name: string;

  @ApiProperty({ description: 'access token' })
  token: string;
}
