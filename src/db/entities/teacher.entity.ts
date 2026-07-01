import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Subject } from './subject.entity';

@Entity('teacher')
export class Teacher {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ 
    type: 'varchar',
    length: 35,
    nullable: false, 
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 35,
    nullable: true,
  })
  father_name: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  qualification: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  experience: string;

  @Column({
    type: 'varchar',
    length: 15,
    nullable: true,
  })
  phone: string;

  @ManyToMany(() => Subject, (subject) => subject.teachers, { eager: true })
  @JoinTable({ name: 'teacher_subjects' }) // 👈 owner side holds the JoinTable
  assign_subjects: Subject[];

  @Column({
    type: 'varchar',
    length: 30,
    nullable: false,
  })
  email: string;

  @Column({ 
    type: 'varchar',
    length: 10,
    nullable: false, 
  })
  gender: string;
  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  Address: string;

  @Column({ default: true, name: 'isActive' })
  isActive: boolean;
}
