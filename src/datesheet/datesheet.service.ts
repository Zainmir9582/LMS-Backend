import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Datesheet } from 'src/db/entities/datesheet.entity';
import { DatesheetItem } from 'src/db/entities/datesheet-item.entity';
import { Class } from 'src/db/entities/class.entity';
import { Cource } from 'src/db/entities/cource.entity';
import { Subject } from 'src/db/entities/subject.entity';
import { CreateDatesheetDto } from './dto/create-datesheet.dto';
import { UpdateDatesheetDto } from './dto/update-datesheet.dto';
import { CreateDatesheetItemDto } from './dto/create-datesheet-item.dto';

@Injectable()
export class DatesheetService {
  constructor(
    @InjectRepository(Datesheet) private datesheetRepository: Repository<Datesheet>,
    @InjectRepository(DatesheetItem) private itemRepository: Repository<DatesheetItem>,
    @InjectRepository(Class) private classRepository: Repository<Class>,
    @InjectRepository(Cource) private courceRepository: Repository<Cource>,
    @InjectRepository(Subject) private subjectRepository: Repository<Subject>,
  ) {}

  async create(dto: CreateDatesheetDto) {
    const classEntity = await this.classRepository.findOne({ where: { id: dto.classId } });
    if (!classEntity) throw new HttpException('Class not found', HttpStatus.NOT_FOUND);
    const cource = dto.courceId ? await this.courceRepository.findOne({ where: { id: dto.courceId } }) : null;
    return this.datesheetRepository.save(this.datesheetRepository.create({ test_name: dto.test_name, class: classEntity, cource }));
  }

  findAll() {
    return this.datesheetRepository.find({ relations: ['items', 'items.subject'] });
  }

  async findOne(id: string) {
    const datesheet = await this.datesheetRepository.findOne({ where: { id }, relations: ['items', 'items.subject'] });
    if (!datesheet) throw new HttpException('Datesheet not found', HttpStatus.NOT_FOUND);
    return datesheet;
  }

  async update(id: string, dto: UpdateDatesheetDto) {
    const datesheet = await this.findOne(id);
    if (dto.test_name !== undefined) datesheet.test_name = dto.test_name;
    if (dto.classId !== undefined) {
      const classEntity = await this.classRepository.findOne({ where: { id: dto.classId } });
      if (!classEntity) throw new HttpException('Class not found', HttpStatus.NOT_FOUND);
      datesheet.class = classEntity;
    }
    if (dto.courceId !== undefined) {
      datesheet.cource = dto.courceId ? await this.courceRepository.findOne({ where: { id: dto.courceId } }) : null;
    }
    return this.datesheetRepository.save(datesheet);
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.datesheetRepository.delete(id);
    return { message: 'Datesheet deleted successfully' };
  }

  async addItem(datesheetId: string, dto: CreateDatesheetItemDto) {
    const datesheet = await this.findOne(datesheetId);
    const subject = await this.subjectRepository.findOne({ where: { id: dto.subjectId } });
    if (!subject) throw new HttpException('Subject not found', HttpStatus.NOT_FOUND);
    const item = this.itemRepository.create({ datesheet, subject, date: new Date(dto.date), syllabus: dto.syllabus || '' });
    return this.itemRepository.save(item);
  }

  async printDatesheet(id: string) {
    const datesheet = await this.findOne(id);
    const sortedItems = [...(datesheet.items || [])].sort((a, b) => +new Date(a.date) - +new Date(b.date));
    return {
      datesheetId: datesheet.id,
      test_name: datesheet.test_name,
      className: datesheet.class?.name,
      courceName: datesheet.cource?.name ?? null,
      subjects: sortedItems.map((item) => ({
        subject: item.subject?.subject_name,
        date: item.date,
        syllabus: item.syllabus,
      })),
    };
  }
}
