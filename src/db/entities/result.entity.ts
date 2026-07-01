import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Student } from './student.entity';
import { Class } from './class.entity';
import { Cource } from './cource.entity';

@Entity('result')
export class Result {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  examName: string;

  @ManyToOne(() => Student, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn()
  student: Student;

  @ManyToOne(() => Class, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn()
  class: Class;

  @ManyToOne(() => Cource, { eager: true, nullable: true, onDelete: 'SET NULL' })
  @JoinColumn()
  cource: Cource | null;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  obtainedMarks: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  totalMarks: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: false })
  percentage: number;

  @Column({ type: 'varchar', length: 10, nullable: false })
  grade: string;
}
