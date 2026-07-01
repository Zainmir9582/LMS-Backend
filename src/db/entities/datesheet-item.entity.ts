import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Datesheet } from './datesheet.entity';
import { Subject } from './subject.entity';

@Entity('datesheet_item')
export class DatesheetItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Datesheet, (datesheet) => datesheet.items, { onDelete: 'CASCADE' })
  @JoinColumn()
  datesheet: Datesheet;

  @ManyToOne(() => Subject, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn()
  subject: Subject;

  @Column({ type: 'date', nullable: false })
  date: Date;

  @Column({ type: 'text', nullable: true })
  syllabus: string;
}
