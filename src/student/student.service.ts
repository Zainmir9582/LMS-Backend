import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from '../db/entities/student.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CourceService } from 'src/cource/cource.service';
import { ClassService } from 'src/class/class.service';
import { PageMetaDto } from 'src/common/dtos/page-meta.dto';
import { PageDto } from 'src/common/dtos/page.dto';
import { StudentPageOptionsDto } from './dto/student-page-option.dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    @Inject(CourceService)
    private readonly courceService: CourceService,
    @Inject(ClassService)
    private readonly classService: ClassService,
  ) {}
  async create(createStudentDto: CreateStudentDto) {
    // Generate new student_id in the format st[number]
    const students = await this.studentRepository.find({ select: ['student_id'] });
    let maxNumber = 0;
    students.forEach(s => {
      const match = s.student_id && s.student_id.match(/^st(\d+)$/);
      if (match) {
        const num = parseInt(match[1], 10);
        if (num > maxNumber) maxNumber = num;
      }
    });
    const newStudentId = `st${maxNumber + 1}`;

    // Fetch the class entity by ID
    const classEntity = await this.classService.findOne(createStudentDto.class);
    if (!classEntity) {
      throw new HttpException('Class not found', HttpStatus.NOT_FOUND);
    }
  
    // Fetch the course entity by ID
    let courseEntity = null;
    if (createStudentDto.cource) {
      courseEntity = await this.courceService.findOne(createStudentDto.cource);
      if (!courseEntity) {
        throw new HttpException('Cource not found', HttpStatus.NOT_FOUND);
      }
    }
  
    // Create the student entity
    const newStudent = this.studentRepository.create({
      student_id: newStudentId, // Automatically generated
      name: createStudentDto.name,
      f_name: createStudentDto.f_name,
      gender: createStudentDto.gender,
      Address: createStudentDto.Address,
      phone: createStudentDto.phone,
      fee: createStudentDto.fee,
      dateOfBirth: createStudentDto.dateOfBirth,
      class: classEntity, // Associate class entity
      cource: courseEntity, // Associate course entity
    });
  
    // Save the new student
    const savedStudent = await this.studentRepository.save(newStudent);
  
    return savedStudent;
  }
  
  async findAll() {
    return await this.studentRepository.find({ relations: ['class', 'cource'] });
  }

  async findOne(id: string) {
    const student = await this.studentRepository.findOne({ where: { id: id } });
    if (!student) {
      throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
    }
    return student;
  }

  async update(id: string, updateStudentDto: UpdateStudentDto) {
    // Find the student by ID
    const student = await this.studentRepository.findOne({ where: { id: id } });
    if (!student) {
      throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
    }

    // Update only the allowed fields
    const updatedFields: Partial<Student> = {};
    if (updateStudentDto.name !== undefined) {
      updatedFields.name = updateStudentDto.name;
    }
    if (updateStudentDto.f_name !== undefined) {
      updatedFields.f_name = updateStudentDto.f_name;
    }
    if (updateStudentDto.gender !== undefined) {
      updatedFields.gender = updateStudentDto.gender;
    }
    if (updateStudentDto.Address !== undefined) {
      updatedFields.Address = updateStudentDto.Address;
    }
    if (updateStudentDto.phone !== undefined) {
      updatedFields.phone = updateStudentDto.phone;
    }
    if (updateStudentDto.fee !== undefined) {
      updatedFields.fee = updateStudentDto.fee;
    }
    if (updateStudentDto.dateOfBirth !== undefined) {
      updatedFields.dateOfBirth = new Date(updateStudentDto.dateOfBirth);
    }
if (updateStudentDto.isActive !== undefined) {
  updatedFields.isActive = updateStudentDto.isActive;
}
    // Handle class update if provided
    if (updateStudentDto.class !== undefined) {
      const classEntity = await this.classService.findOne(updateStudentDto.class);
      if (!classEntity) {
        throw new HttpException('Class not found', HttpStatus.NOT_FOUND);
      }
      updatedFields.class = classEntity;
    }

    // Handle course update if provided
    if (updateStudentDto.cource !== undefined) {
      if (updateStudentDto.cource === null) {
        updatedFields.cource = null;
      } else {
        const courseEntity = await this.courceService.findOne(updateStudentDto.cource);
        if (!courseEntity) {
          throw new HttpException('Cource not found', HttpStatus.NOT_FOUND);
        }
        updatedFields.cource = courseEntity;
      }
    }

    // Update the student with the new fields
    await this.studentRepository.update(id, updatedFields);

    // Return the updated student
    const updatedStudent = await this.studentRepository.findOne({ where: { id: id } });
    if (!updatedStudent) {
      throw new HttpException('Student not found after update', HttpStatus.NOT_FOUND);
    }
    return updatedStudent;
  }

  async remove(id: string) {
    const student = await this.studentRepository.findOne({ where: { id: id } });
    if (!student) {
      throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
    }
    const result = await this.studentRepository.delete(id);
    if (result.affected === 0) {
      throw new HttpException('Student not found or already deleted', HttpStatus.NOT_FOUND);
    }
    return { message: 'Student deleted successfully' };
  }

  async getPrintableList(classId?: string) {
    const students = await this.studentRepository.find({ relations: ['class', 'cource'] });
    const filtered = classId ? students.filter((s) => s.class?.id === classId) : students;
    const sorted = filtered.sort((a, b) => {
      const classCompare = (a.class?.name || '').localeCompare(b.class?.name || '');
      if (classCompare !== 0) return classCompare;
      const courseCompare = (a.cource?.name || '').localeCompare(b.cource?.name || '');
      if (courseCompare !== 0) return courseCompare;
      return a.name.localeCompare(b.name);
    });

    const grouped: Record<string, Student[]> = {};
    for (const student of sorted) {
      const key = `${student.class?.name || 'No Class'} | ${student.cource?.name || 'No Course'}`;
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(student);
    }
    return grouped;
  }

    async getAllPageData(studentPageOptionsDto: StudentPageOptionsDto) {
      const queryBuilder = this.studentRepository
      .createQueryBuilder('student')
      .leftJoinAndSelect('student.class', 'class')
      .leftJoinAndSelect('student.cource', 'cource');
  
    // Handle ordering - FIXED
    const orderBy = studentPageOptionsDto.orderBy || 'name';
    switch (orderBy) {
      case 'class':
        queryBuilder.orderBy('class.name', studentPageOptionsDto.order);
        break;
      case 'status':
        queryBuilder.orderBy('student.isActive', studentPageOptionsDto.order);
        break;
      case 'course':
        queryBuilder.orderBy('cource.name', studentPageOptionsDto.order);
        break;
      default:
        // Always fallback to valid column
        queryBuilder.orderBy(`student.${orderBy}`, studentPageOptionsDto.order);
        break;
    }
    queryBuilder.select([
      'student.id',
      'student.student_id',
      'student.name',
      'student.f_name',
      'student.gender',
      'student.Address',
      'student.phone',
      'student.fee',
      'student.dateOfBirth',
      'student.isActive',
      'class.id',
      'class.name',
      'cource.id',
      'cource.name',
    ]); // added selection

    // Apply search filter
    if (studentPageOptionsDto.search) {
      const search = studentPageOptionsDto.search.trim();
      queryBuilder.andWhere(
        '(student.name LIKE :search OR student.student_id LIKE :search OR student.phone LIKE :search)',
        { search: `%${search}%` },
      );
    }

    // Apply active status filter
    if (studentPageOptionsDto.selectstatus !== undefined) {
      const isActive = studentPageOptionsDto.selectstatus === 'true';
      queryBuilder.andWhere('student.isActive = :isActive', { isActive });
    }

    // Delete this block:
if (studentPageOptionsDto.selectis_active !== undefined) {
  const isActive = studentPageOptionsDto.selectis_active === 'true';
  queryBuilder.andWhere('student.isActive = :isActive', { isActive });
}

   // Replace existing class/course filter with:
if (studentPageOptionsDto.selectclass) {
  queryBuilder.andWhere('class.id = :classId', {
    classId: studentPageOptionsDto.selectclass,
  });
}

if (studentPageOptionsDto.selectcource) {
  queryBuilder.andWhere('cource.id = :courceId', {
    courceId: studentPageOptionsDto.selectcource,
  });
}

   
    // taking next page data
    if (studentPageOptionsDto.page > 1) {
      studentPageOptionsDto.skip =
        (studentPageOptionsDto.page - 1) * studentPageOptionsDto.take;
    }
    queryBuilder
      .skip(studentPageOptionsDto.skip)
      .take(studentPageOptionsDto.take);
    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();
    const pageMetaDto = new PageMetaDto({
      itemCount,
      pageOptionsDto: studentPageOptionsDto,
    });
    return new PageDto<Student>(entities, pageMetaDto);
  }
}