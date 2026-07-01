import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('grading_criteria')
export class GradingCriteria {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 10, nullable: false })
  grade: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: false })
  minPercentage: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: false })
  maxPercentage: number;
}
