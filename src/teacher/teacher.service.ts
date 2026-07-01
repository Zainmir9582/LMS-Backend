import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from 'src/db/entities/teacher.entity';
import { Repository } from 'typeorm';
import { TeacherPageOptionsDto } from './dto/teacher-page-option.dto';
import { PageDto } from 'src/common/dtos/page.dto';
import { PageMetaDto } from 'src/common/dtos/page-meta.dto';
@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private teacherRepository: Repository<Teacher>,
  ) {}

  async create(createTeacherDto: CreateTeacherDto) {
    const teacher = this.teacherRepository.create(createTeacherDto);
    return this.teacherRepository.save(teacher);
  }

  async findAll() {
    return this.teacherRepository.find();
  }

  async findOne(id: string) {
    const teacher = await this.teacherRepository.findOne({ where: { id } });
    if (!teacher) {
      throw new HttpException('Teacher not found', HttpStatus.NOT_FOUND);
    }
    return teacher;
  }

  async update(id: string, updateTeacherDto: UpdateTeacherDto) {
    const existing = await this.findOne(id);
    await this.teacherRepository.update(existing.id, updateTeacherDto);
    return this.findOne(id);
  }

  async remove(id: string) {
    const existing = await this.findOne(id);
    await this.teacherRepository.delete(existing.id);
    return { message: 'Teacher deleted successfully' };
  }
  async getAllPageData(teacherPageOptionDto: TeacherPageOptionsDto) {
    // Ensure all pagination values are proper numbers
    const page = Number(teacherPageOptionDto.page) || 1;
    const take = Number(teacherPageOptionDto.take) || 10;
    const skip = (page - 1) * take;
  
    const queryBuilder = this.teacherRepository
      .createQueryBuilder('teacher')
      .leftJoinAndSelect('teacher.assign_subjects', 'assign_subjects');
  
    // Search
    if (teacherPageOptionDto.search?.trim()) {
      const search = `%${teacherPageOptionDto.search.trim()}%`;
      queryBuilder.andWhere('teacher.name LIKE :search OR teacher.email LIKE :search OR teacher.phone LIKE :search OR teacher.father_name LIKE :search', { search });
    }
  
    // Ordering
    const orderBy = (teacherPageOptionDto.orderBy || 'name').toLowerCase();
    const order = (teacherPageOptionDto.order || 'ASC').toUpperCase() as 'ASC' | 'DESC';
  
    if (orderBy === 'name') {
      queryBuilder.orderBy('teacher.name', order);
    } else if (orderBy === 'id') {
      queryBuilder.orderBy('teacher.id', order);
    } else {
      queryBuilder.orderBy('teacher.name', 'ASC'); // safe default
    }
  
    // Apply pagination
    queryBuilder.skip(skip).take(take);
  
    // Execute query
    const [entities, itemCount] = await queryBuilder.getManyAndCount();
  
    const pageMetaDto = new PageMetaDto({
      itemCount,
      pageOptionsDto: teacherPageOptionDto,
    });
  
    return new PageDto(entities, pageMetaDto);
  }
}
