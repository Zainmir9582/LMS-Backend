import { Cource } from 'src/db/entities/cource.entity';
import { Class } from 'src/db/entities/class.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne, JoinColumn } from 'typeorm';
import { Datesheet } from './datesheet.entity';
import { Teacher } from './teacher.entity';
@Entity('subject')
export class Subject {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  subject_name: string;

  @ManyToOne(() => Class, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn()
  class: Class;

  @ManyToMany(() => Cource, (cource) => cource.subjects, { nullable: true, onDelete: 'CASCADE' })
  @JoinTable()
  cources: Cource[];
  @ManyToMany(() => Datesheet, (datesheet) => datesheet.subjects)
  datesheets: Datesheet[];
  // ✅ Inverse side — no @JoinTable here
  @ManyToMany(() => Teacher, (teacher) => teacher.assign_subjects)
  teachers: Teacher[];
}