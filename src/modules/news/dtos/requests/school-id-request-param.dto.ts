import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber } from "class-validator";

export class SchoolIdRequestParamDto {
  @ApiProperty({ description: 'school id' })
  @Type(() => Number)
  @IsNumber()
  schoolId: number;
}