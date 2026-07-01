import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user') // 'users' is the table name
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
  Last_name: string;

  @Column({
    type: 'varchar',
    length: 30,
    nullable: false,
  })
  email: string;

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
    nullable: true,
  })
  password: string;

  @Column({ default: true, name: 'isActive' })
  isActive: boolean;
}
