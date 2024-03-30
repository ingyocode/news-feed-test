export class AdminsEntity {
  id: string;
  levelId: number;
  email: string;
  name: string;
  password: string;
  salt: string;
  isDeleted: boolean;
  lastLoginedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export class AdminLevelsEntity {
  id: number;
  description: string;
}