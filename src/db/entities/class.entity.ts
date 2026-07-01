import { Cource } from 'src/db/entities/cource.entity';
import { Student } from 'src/db/entities/student.entity';
import { Fee } from 'src/db/entities/fee.entity';
import { Datesheet } from 'src/db/entities/datesheet.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';

@Entity('class')
export class Class {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ 
    type: 'varchar',
    length: 35,
    nullable: false, 
  })
  name: string;

  @OneToMany(() => Student, (student) => student.class)
  students: Student[];

  @OneToMany(() => Fee, (fee) => fee.class)
  fees: Fee[];

  @ManyToMany(() => Cource, (cource) => cource.classes, { onDelete: 'CASCADE' })
  @JoinTable() // Define the join table here
  cources: Cource[];

  @OneToMany(() => Datesheet, (datesheet) => datesheet.class)
  datesheets: Datesheet[];
}
