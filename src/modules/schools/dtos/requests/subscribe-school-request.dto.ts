import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";
import { Type } from 'class-transformer';

export class SubscribeSchoolRequestParamDto {
  @ApiProperty({ description: 'school id' })
  @Type(() => Number)
  @IsNumber()
  schoolId: number;
}