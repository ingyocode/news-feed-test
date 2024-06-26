import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateNewsRequestBodyDto {
  @ApiProperty({ description: 'news title' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'news content' })
  @IsString()
  content: string;
}
