export class NewsEntity {
  id: number;
  schoolId: number;
  writerId: string;
  title: string;
  content: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}