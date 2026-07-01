import { Class } from 'src/db/entities/class.entity';
import { Cource } from 'src/db/entities/cource.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Fee } from 'src/db/entities/fee.entity';
 
 @Entity('student') // 'users' is the table name
 export class Student {
   @PrimaryGeneratedColumn('uuid')
   id: string;
 
   @Column({ 
     type: 'varchar',
     nullable: false, })
   student_id: string;
 
   @Column({ 
     type: 'varchar',
     length: 35,
     nullable: false, })
   name: string;
 
   @Column({ 
     type:'varchar',
     nullable:true,
     length: 35 
   })
   f_name: string;
 
   @Column({ 
     type: 'varchar',
     length: 10,
     nullable: false, })
   gender: string;
 
   @Column({ 
     type: 'varchar',
     length: 100,
     nullable: false, })
   Address: string;
   
   @Column({
     type: 'varchar',
     length: 15,
     nullable: true,
   })
   phone:string;
 
   @Column({
     type: 'decimal',
     precision: 10,
     scale: 2,
     nullable: false,
     default: 0,
   })
   fee: number;
 
   @Column({
     type: 'date',
     nullable: false,
   })
   dateOfBirth: Date;
 
   @ManyToOne(() => Class, (classes) => classes.students)
   @JoinColumn()
   class: Class;
 
    @ManyToOne(() => Cource, (cource) => cource.students)
   @JoinColumn()
   cource: Cource;

   @OneToMany(() => Fee, (fee) => fee.student)
   fees: Fee[];
 
   @Column({ default: true, name: 'isActive' })
   isActive: boolean;
 }
