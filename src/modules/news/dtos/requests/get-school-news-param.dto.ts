import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetSchoolNewsParamRequestDto {
  @ApiProperty({ description: 'school id' })
  @Type(() => Number)
  @IsNumber()
  schoolId: number;
}
