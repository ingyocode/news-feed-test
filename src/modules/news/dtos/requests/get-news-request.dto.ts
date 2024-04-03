import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber } from "class-validator";

export class GetNewsRequestQueryDto {
  @ApiProperty({ description: 'offset page' })
  @Type(() => Number)
  @IsNumber()
  page: number;

  @ApiProperty({ description: 'offset limit' })
  @Type(() => Number)
  @IsNumber()
  limit: number;
}