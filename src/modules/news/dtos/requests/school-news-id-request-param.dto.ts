import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class SchoolNewsIdRequestParamDto {
  @ApiProperty({ description: 'school id' })
  @Type(() => Number)
  @IsNumber()
  schoolId: number;

  @ApiProperty({ description: 'news id' })
  @Type(() => Number)
  @IsNumber()
  newsId: number;
}
