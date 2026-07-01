import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../db/entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
   const user = await this.userRepository.findOne({
    where :{email: createUserDto.email}
   })

   if(user)
    { throw new HttpException('Email is already is use',HttpStatus.BAD_REQUEST)}
   
     let new_user= this.userRepository.create({
      ...createUserDto
    })
    let save = this.userRepository.save(new_user);
    return save;
  }

  
  async update(userid: string, updateUserDto: UpdateUserDto) {
    let user_id = await this.userRepository.findOne({
      where:{id: userid}
    })
    const user = await this.userRepository.findOne({
      where :{email: updateUserDto.email}
     })
  
     if(user)
      { throw new HttpException('Email is already is use',HttpStatus.BAD_REQUEST)}
     
      user_id.name = updateUserDto.name;
      user_id.email = updateUserDto.email;
      user_id.Last_name = updateUserDto.Last_name;
      user_id.password = updateUserDto.password;
      user_id.Address = updateUserDto.address;
      user_id.gender = updateUserDto.gender;
      let save = this.userRepository.save(user_id);
      return save;
  }
  

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: string): Promise<User | null> {
    let user = await this.userRepository.findOne({where:{id:id}})
    
    if(!user)
    {
      throw new HttpException('User is not found',HttpStatus.BAD_REQUEST);
    }
    
    return this.userRepository.findOneBy({ id:user.id });
  }

  async remove(id: string): Promise<void> {

    let user = await this.userRepository.findOne({where:{id:id}})

    if(!user)
    {
      throw new HttpException('user is not found',HttpStatus.BAD_REQUEST)
    }
    await this.userRepository.delete(id);
  }
}