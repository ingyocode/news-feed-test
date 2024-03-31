import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('schoools')
export class SchoolsEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', array: true, nullable: false })
  adminIds: string[];

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