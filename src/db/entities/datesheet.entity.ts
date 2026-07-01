import { Class } from 'src/db/entities/class.entity';
import { Cource } from 'src/db/entities/cource.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany,ManyToMany,JoinTable } from 'typeorm';
import { DatesheetItem } from './datesheet-item.entity';
import { Subject } from './subject.entity';

@Entity('datesheet')
export class Datesheet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  test_name: string;

  @ManyToOne(() => Class, (classEntity) => classEntity.datesheets)
  @JoinColumn()
  class: Class;

  @ManyToOne(() => Cource, (cource) => cource.datesheets, { nullable: true })
  @JoinColumn()
  cource: Cource | null;

  @OneToMany(() => DatesheetItem, (item) => item.datesheet, { cascade: true })
  items: DatesheetItem[];

  @ManyToMany(() => Subject)
  @JoinTable()
  subjects: Subject[];
}