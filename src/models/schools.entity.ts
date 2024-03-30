export class SchoolsEntity {
  id: number;
  adminIds: string[];
  region: string;
  name: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}