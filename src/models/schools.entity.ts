import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('schoools')
export class SchoolsEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', nullable: false })
  adminId: string;

  @Column({ type: 'varchar', nullable: false })
  region: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'bool', nullable: false, default: false })
  isDeleted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}