import { IsEmail } from "class-validator";
import { Column } from "typeorm";

export class CreateStudentDto {
     
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
  
    @Column()
    class: string;
  
     @Column({ nullable: true })
    cource?: string;
}
