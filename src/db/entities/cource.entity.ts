import { Class } from 'src/db/entities/class.entity';
import { Student } from 'src/db/entities/student.entity';
import { Fee } from 'src/db/entities/fee.entity';
import { Subject } from 'src/db/entities/subject.entity';
import { Datesheet } from 'src/db/entities/datesheet.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany } from 'typeorm';

@Entity('cource')
export class Cource {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ 
    type: 'varchar',
    length: 35,
    nullable: false, 
  })
  name: string;

  @OneToMany(() => Student, (student) => student.cource)
  students: Student[];

  @OneToMany(() => Fee, (fee) => fee.cource)
  fees: Fee[];

  @ManyToMany(() => Class, (classes) => classes.cources, { onDelete: 'CASCADE' })
  classes: Class[];

  @ManyToMany(() => Subject, (subject) => subject.cources)
  subjects: Subject[];

  @OneToMany(() => Datesheet, (datesheet) => datesheet.cource)
  datesheets: Datesheet[];
}