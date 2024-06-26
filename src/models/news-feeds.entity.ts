import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('news_feeds')
export class NewsFeedsEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', nullable: false })
  studentId: string;

  @Column({ type: 'int', nullable: false })
  newsId: number;

  @CreateDateColumn()
  createdAt: Date;
}
