import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Result } from 'src/db/entities/result.entity';
import { Student } from 'src/db/entities/student.entity';
import { Class } from 'src/db/entities/class.entity';
import { Cource } from 'src/db/entities/cource.entity';
import { GradingCriteria } from 'src/db/entities/grading-criteria.entity';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';
import { CreateGradingCriteriaDto } from './dto/create-grading-criteria.dto';
import { UpdateGradingCriteriaDto } from './dto/update-grading-criteria.dto';

@Injectable()
export class ResultsService {
  constructor(
    @InjectRepository(Result) private resultRepository: Repository<Result>,
    @InjectRepository(Student) private studentRepository: Repository<Student>,
    @InjectRepository(Class) private classRepository: Repository<Class>,
    @InjectRepository(Cource) private courceRepository: Repository<Cource>,
    @InjectRepository(GradingCriteria) private criteriaRepository: Repository<GradingCriteria>,
  ) {}

  private async resolveGrade(percentage: number) {
    const criteria = await this.criteriaRepository.find();
    const matched = criteria.find((item) => percentage >= Number(item.minPercentage) && percentage <= Number(item.maxPercentage));
    return matched?.grade ?? 'N/A';
  }

  private async mapResult(dto: CreateResultDto) {
    const student = await this.studentRepository.findOne({ where: { id: dto.studentId } });
    if (!student) throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
    const classEntity = await this.classRepository.findOne({ where: { id: dto.classId } });
    if (!classEntity) throw new HttpException('Class not found', HttpStatus.NOT_FOUND);
    const cource = dto.courceId ? await this.courceRepository.findOne({ where: { id: dto.courceId } }) : null;
    const percentage = dto.totalMarks > 0 ? (Number(dto.obtainedMarks) / Number(dto.totalMarks)) * 100 : 0;
    const grade = await this.resolveGrade(percentage);
    return this.resultRepository.create({ examName: dto.examName, student, class: classEntity, cource, obtainedMarks: dto.obtainedMarks, totalMarks: dto.totalMarks, percentage, grade });
  }

  async create(dto: CreateResultDto) {
    return this.resultRepository.save(await this.mapResult(dto));
  }

  async bulkCreate(results: CreateResultDto[]) {
    const payload: Result[] = [];
    for (const item of results) payload.push(await this.mapResult(item));
    return this.resultRepository.save(payload);
  }

  findAll() {
    return this.resultRepository.find();
  }

  async findOne(id: string) {
    const result = await this.resultRepository.findOne({ where: { id } });
    if (!result) throw new HttpException('Result not found', HttpStatus.NOT_FOUND);
    return result;
  }

  async update(id: string, dto: UpdateResultDto) {
    const existing = await this.findOne(id);
    const fullDto: CreateResultDto = {
      examName: dto.examName ?? existing.examName,
      studentId: dto.studentId ?? existing.student.id,
      classId: dto.classId ?? existing.class.id,
      courceId: dto.courceId ?? existing.cource?.id ?? null,
      obtainedMarks: dto.obtainedMarks ?? Number(existing.obtainedMarks),
      totalMarks: dto.totalMarks ?? Number(existing.totalMarks),
    };
    const mapped = await this.mapResult(fullDto);
    mapped.id = existing.id;
    return this.resultRepository.save(mapped);
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.resultRepository.delete(id);
    return { message: 'Result deleted successfully' };
  }

  async printStudentResult(studentId: string) {
    const records = await this.resultRepository.find({ where: { student: { id: studentId } as any } });
    return records.map((record) => ({
      examName: record.examName,
      obtainedMarks: record.obtainedMarks,
      totalMarks: record.totalMarks,
      percentage: record.percentage,
      grade: record.grade,
    }));
  }

  createCriteria(dto: CreateGradingCriteriaDto) {
    return this.criteriaRepository.save(this.criteriaRepository.create(dto));
  }

  getCriteria() {
    return this.criteriaRepository.find();
  }

  async updateCriteria(id: string, dto: UpdateGradingCriteriaDto) {
    const existing = await this.criteriaRepository.findOne({ where: { id } });
    if (!existing) throw new HttpException('Grading criteria not found', HttpStatus.NOT_FOUND);
    await this.criteriaRepository.update(id, dto);
    return this.criteriaRepository.findOne({ where: { id } });
  }

  async removeCriteria(id: string) {
    const existing = await this.criteriaRepository.findOne({ where: { id } });
    if (!existing) throw new HttpException('Grading criteria not found', HttpStatus.NOT_FOUND);
    await this.criteriaRepository.delete(id);
    return { message: 'Grading criteria deleted successfully' };
  }
}
