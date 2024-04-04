import { ApiProperty } from "@nestjs/swagger";

export class PaginationResponseDto<T> {
  @ApiProperty({ description: 'offset pagination total page' })
  totalPage: number;

  @ApiProperty({ description: 'data' })
  data: T[];
}