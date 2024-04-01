import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateSchoolRequestDto {
  @ApiProperty({ description: 'school region' })
  @IsString()
  region: string;

  @ApiProperty({ description: 'school name' })
  @IsString()
  name: string;
}