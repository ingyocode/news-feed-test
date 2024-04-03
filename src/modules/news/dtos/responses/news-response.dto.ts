import { ApiProperty } from "@nestjs/swagger";

export class NewsResponseDto {
  @ApiProperty({ description: 'news id' })
  id: number;

  @ApiProperty({ description: 'school id' })
  schoolId: number;

  @ApiProperty({ description: 'school name' })
  schoolName: string;

  @ApiProperty({ description: 'news writer(admin) id' })
  writerId: string;

  @ApiProperty({ description: 'news writer(admin) name' })
  writerName: string;

  @ApiProperty({ description: 'news title' })
  title: string;

  @ApiProperty({ description: 'news content' })
  content: string;

  @ApiProperty({ description: 'news created time' })
  createdAt: Date;

  @ApiProperty({ description: 'news updated time' })
  updatedAt: Date;
}