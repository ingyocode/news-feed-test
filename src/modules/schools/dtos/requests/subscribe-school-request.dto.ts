import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class SubscribeSchoolRequestBodyDto {
  @ApiProperty({ description: 'school id' })
  @IsNumber()
  schoolId: number;
}