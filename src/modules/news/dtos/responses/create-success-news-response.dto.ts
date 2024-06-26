import { ApiProperty } from '@nestjs/swagger';

export class CreateSuccessNewsResponseDto {
  @ApiProperty({ description: 'save success or not' })
  result: boolean;
}
