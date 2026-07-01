import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Subject } from 'src/db/entities/subject.entity';
import { Class } from 'src/db/entities/class.entity';
import { Cource } from 'src/db/entities/cource.entity';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { Teacher } from 'src/db/entities/teacher.entity';

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(Subject) private subjectRepository: Repository<Subject>,
    @InjectRepository(Class) private classRepository: Repository<Class>,
    @InjectRepository(Cource) private courceRepository: Repository<Cource>,
  ) {}

  async create(dto: CreateSubjectDto) {
    const classEntity = await this.classRepository.findOne({ where: { id: dto.classId } });
    if (!classEntity) throw new HttpException('Class not found', HttpStatus.NOT_FOUND);
    const cources = dto.courceIds?.length
      ? await this.courceRepository.findBy({ id: In(dto.courceIds) })
      : [];
    return this.subjectRepository.save(this.subjectRepository.create({ subject_name: dto.subject_name, class: classEntity, cources }));
  }

  findAll() {
    return this.subjectRepository.find({ relations: ['cources'] });
  }

  async findOne(id: string) {
    const subject = await this.subjectRepository.findOne({ where: { id }, relations: ['cources'] });
    if (!subject) throw new HttpException('Subject not found', HttpStatus.NOT_FOUND);
    return subject;
  }

  async update(id: string, dto: UpdateSubjectDto) {
    const subject = await this.findOne(id);
    if (dto.subject_name !== undefined) subject.subject_name = dto.subject_name;
    if (dto.classId !== undefined) {
      const classEntity = await this.classRepository.findOne({ where: { id: dto.classId } });
      if (!classEntity) throw new HttpException('Class not found', HttpStatus.NOT_FOUND);
      subject.class = classEntity;
    }
    if (dto.courceIds !== undefined) {
      subject.cources = dto.courceIds.length ? await this.courceRepository.findBy({ id: In(dto.courceIds) }) : [];
    }
    return this.subjectRepository.save(subject);
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.subjectRepository.delete(id);
    return { message: 'Subject deleted successfully' };
  }
}
