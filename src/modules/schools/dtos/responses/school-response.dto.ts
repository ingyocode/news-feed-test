import { ApiProperty } from '@nestjs/swagger';
import { SchoolsEntity } from 'src/models/schools.entity';

export class SchoolInfoResponseDto extends SchoolsEntity {
  @ApiProperty({ description: 'school id' })
  id: number;

  @ApiProperty({ description: 'school admin id' })
  adminId: string;

  @ApiProperty({ description: 'school region' })
  region: string;

  @ApiProperty({ description: 'school name' })
  name: string;

  @ApiProperty({ description: 'school is deleted or not' })
  isDeleted: boolean;

  @ApiProperty({ description: 'school created date' })
  createdAt: Date;

  @ApiProperty({ description: 'school updated date' })
  updatedAt: Date;
}
