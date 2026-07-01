import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Class } from 'src/db/entities/class.entity';
import { In, Repository } from 'typeorm';
import { Cource } from 'src/db/entities/cource.entity';
import { ClassPageOptionsDto } from './dto/class-page-option.dto';
import { PageMetaDto } from 'src/common/dtos/page-meta.dto';
import { PageDto } from 'src/common/dtos/page.dto';

@Injectable()
export class ClassService {
  constructor(
    @InjectRepository(Class)
    private classRepository: Repository<Class>,
    @InjectRepository(Cource)
    private courceRepository: Repository<Cource>,
  ){}

  async create(createClassDto: CreateClassDto) {
    const existing = await this.classRepository.findOne({ where: { name: createClassDto.name } });
    if (existing) {
      throw new HttpException('Class already exists', HttpStatus.CONFLICT);
    }

    let cources: Cource[] = [];
    if (createClassDto.courceIds?.length) {
      cources = await this.courceRepository.findBy({ id: In(createClassDto.courceIds) });
    }

    const classEntity = this.classRepository.create({
      name: createClassDto.name,
      cources,
    });

    return this.classRepository.save(classEntity);
  }

  async findAll() {
    return this.classRepository.find({ relations: ['cources'] });
  }

  async findOne(id: string) {
    const class_id = await this.classRepository.findOne({ where: { id }, relations: ['cources'] });
    if (!class_id) {
      throw new HttpException('Class not found', HttpStatus.NOT_FOUND);
    }
    return class_id;
  }

  async update(id: string, updateClassDto: UpdateClassDto) {
    const classEntity = await this.classRepository.findOne({ where: { id }, relations: ['cources'] });
    if (!classEntity) {
      throw new HttpException('Class not found', HttpStatus.NOT_FOUND);
    }

    if (updateClassDto.name !== undefined) {
      classEntity.name = updateClassDto.name;
    }

    if (updateClassDto.courceIds !== undefined) {
      classEntity.cources = updateClassDto.courceIds.length
        ? await this.courceRepository.findBy({ id: In(updateClassDto.courceIds) })
        : [];
    }

    return this.classRepository.save(classEntity);
  }

  async remove(id: string) {
    const existing = await this.classRepository.findOne({ where: { id } });
    if (!existing) {
      throw new HttpException('Class not found', HttpStatus.NOT_FOUND);
    }
    await this.classRepository.delete(id);
    return { message: 'Class deleted successfully' };
  }

  async getAllPageData(classPageOptionsDto: ClassPageOptionsDto) {
    // Ensure all pagination values are proper numbers
    const page = Number(classPageOptionsDto.page) || 1;
    const take = Number(classPageOptionsDto.take) || 10;
    const skip = (page - 1) * take;
  
    const queryBuilder = this.classRepository
      .createQueryBuilder('class')
      .leftJoinAndSelect('class.cources', 'cources');
  
    // Search
    if (classPageOptionsDto.search?.trim()) {
      const search = `%${classPageOptionsDto.search.trim()}%`;
      queryBuilder.andWhere('class.name LIKE :search', { search });
    }
  
    // Ordering
    const orderBy = (classPageOptionsDto.orderBy || 'name').toLowerCase();
    const order = (classPageOptionsDto.order || 'ASC').toUpperCase() as 'ASC' | 'DESC';
  
    if (orderBy === 'name') {
      queryBuilder.orderBy('class.name', order);
    } else if (orderBy === 'id') {
      queryBuilder.orderBy('class.id', order);
    } else {
      queryBuilder.orderBy('class.name', 'ASC'); // safe default
    }
  
    // Apply pagination
    queryBuilder.skip(skip).take(take);
  
    // Execute query
    const [entities, itemCount] = await queryBuilder.getManyAndCount();
  
    const pageMetaDto = new PageMetaDto({
      itemCount,
      pageOptionsDto: classPageOptionsDto,
    });
  
    return new PageDto(entities, pageMetaDto);
  }
}
