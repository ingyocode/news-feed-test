export class StudentsEntity {
  id: string;
  email: string;
  name: string;
  password: string;
  salt: string;
  isDeleted: boolean;
  lastLoginedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export class StudentsSubscribesEntity {
  id: number;
  studentId: string;
  schoolId: number;
  createdAt: string;
}