import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Student } from 'src/db/entities/student.entity';
import { Class } from 'src/db/entities/class.entity';
import { Cource } from 'src/db/entities/cource.entity';

@Entity('fee')
export class Fee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  fee: number; // total fee amount

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
    default: 0,
    name: 'receive_fee',
  })
  receiveFee: number; // amount received

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
    default: 0,
    name: 'remaining_fee',
  })
  remainingFee: number; // remaining amount to be paid

  @Column({
    type: 'varchar',
    length: 10,
    nullable: false,
    default: 'unpaid',
    name: 'fee_status',
  })
  feeStatus: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
    default: 0,
    name: 'paper_fund',
  })
  paperFund: number;

  @Column({
    type: 'varchar',
    length: 40,
    nullable: true,
    name: 'receipt_no',
  })
  receiptNo: string | null;

  @Column({
    type: 'date',
    nullable: false,
    name: 'paid_at',
  })
  paidAt: Date;

  // New date field
  @Column({
    type: 'date',
    nullable: false,
    name: 'date',
  })
  date: Date;

  @Column({ type: 'int', nullable: false, default: 1 })
  month: number;

  @Column({ type: 'int', nullable: false, default: 2000 })
  year: number;

  @Column({ type: 'text', nullable: true })
qrCode: string;

@Column({ nullable: true })
slipPath: string;

  @ManyToOne(() => Student, (student) => student.fees, { onDelete: 'CASCADE' })
  @JoinColumn()
  student: Student;

  @ManyToOne(() => Class, (classEntity) => classEntity.fees, { onDelete: 'CASCADE' })
  @JoinColumn()
  class: Class;

  @ManyToOne(() => Cource, (cource) => cource.fees, { onDelete: 'CASCADE' })
  @JoinColumn()
  cource: Cource;
}
