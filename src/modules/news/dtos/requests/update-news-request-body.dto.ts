import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class UpdateNewsRequestBodyDto {
  @ApiPropertyOptional({ description: 'news title' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ description: 'news content' })
  @IsOptional()
  @IsString()
  content?: string;
}