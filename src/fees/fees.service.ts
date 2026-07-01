import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fee } from 'src/db/entities/fee.entity';
import { CreateFeeDto } from './dto/create-fee.dto';
import { UpdateFeeDto } from './dto/update-fee.dto';
import { StudentService } from 'src/student/student.service';
import { FeesPageOptionsDto } from './dto/fees-page-options.dto';
import { PageDto } from 'src/common/dtos/page.dto';
import { PageMetaDto } from 'src/common/dtos/page-meta.dto';
import { FeeSummaryDto } from './dto/fee-summary.dto';
import { Class } from 'src/db/entities/class.entity';
import { Cource } from 'src/db/entities/cource.entity';

@Injectable()
export class FeesService {
  constructor(
    @InjectRepository(Fee)
    private feeRepository: Repository<Fee>,
    @InjectRepository(Class)
    private classRepository: Repository<Class>,
    @InjectRepository(Cource)
    private courceRepository: Repository<Cource>,
    @Inject(StudentService)
    private readonly studentService: StudentService,
  ) {}
  

  async create(createFeeDto: CreateFeeDto) {
    const student = await this.studentService.findOne(createFeeDto.student);
    if (!student) throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
  
    const classEntity = await this.classRepository.findOne({ where: { id: createFeeDto.class } });
    if (!classEntity) throw new HttpException('Class not found', HttpStatus.NOT_FOUND);
  
    let courseEntity: Cource | null = null;
    if (createFeeDto.cource) {
      courseEntity = await this.courceRepository.findOne({ where: { id: createFeeDto.cource } });
      if (!courseEntity) throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
    }
  
     // Convert all values to numbers
  const totalFee = Number(student.fee ?? 0);
  const currentPayment = Number(createFeeDto.receiveFee ?? 0);

  const previousPayments = await this.feeRepository.find({ 
    where: {
      student: { id: createFeeDto.student },
      class: { id: createFeeDto.class },
    } as any,
  });

  const totalPaidPreviously = previousPayments.reduce(
    (sum, payment) => sum + Number(payment.receiveFee ?? 0),
    0
  );

  const totalPaidAfterThis = totalPaidPreviously + currentPayment;
  const remainingFee = Math.max(totalFee - totalPaidAfterThis, 0);

  // Fee status logic (unchanged)
  let feeStatus: 'paid' | 'partial' | 'unpaid';
  if (remainingFee === 0) feeStatus = 'paid';
  else if (totalPaidAfterThis > 0) feeStatus = 'partial';
  else feeStatus = 'unpaid';

  // Generate unique receipt number
  // Generate receipt number
  const receiptNo = `REC-${Date.now()}`;

  // Generate QR data
  const qrData = JSON.stringify({
    feeId: 'pending',
    receiptNo,
    studentId: student.id,
    amount: currentPayment,
    date: new Date().toISOString(),
  });

  const fee = this.feeRepository.create({
    fee: totalFee,
    receiveFee: currentPayment,
    remainingFee,
    feeStatus,
    paperFund: createFeeDto.paperFund ?? 0,
    paidAt: new Date(createFeeDto.paidAt || new Date()),
    date: new Date(createFeeDto.date || new Date()),
    month: new Date(createFeeDto.date || new Date()).getMonth() + 1,
    year: new Date(createFeeDto.date || new Date()).getFullYear(),
    student,
    class: classEntity,
    cource: courseEntity,
    qrCode: qrData,
    receiptNo,
  });

  const savedFee = await this.feeRepository.save(fee);
  
  const finalQrData = JSON.stringify({
    ...JSON.parse(qrData),
    feeId: savedFee.id,
  });
  savedFee.qrCode = finalQrData;
  await this.feeRepository.save(savedFee);

  // Generate and save slip
  // savedFee.slipPath = await this.slipService.generateSlipWithQR(
  //   savedFee.id,
  //   finalQrData
  // );
  
  // Update fee with slip path
  return savedFee;
  }
  
  async findAll() {
    return await this.feeRepository.find({ 
      relations: ['student', 'class', 'cource'] 
    });
  }

  async findByStudent(studentId: string) {
    return await this.feeRepository.find({ 
      where: { student: { id: studentId } as any }, 
      relations: ['student', 'class', 'cource'] 
    });
  }

  async findOne(id: string) {
    const fee = await this.feeRepository.findOne({ 
      where: { id }, 
      relations: ['student', 'class', 'cource'] 
    });
    if (!fee) {
      throw new HttpException('Fee not found', HttpStatus.NOT_FOUND);
    }
    return fee;
  }

  async update(id: string, updateFeeDto: UpdateFeeDto) {
    const existing = await this.feeRepository.findOne({ where: { id } });
    if (!existing) {
      throw new HttpException('Fee not found', HttpStatus.NOT_FOUND);
    }

    const updated: Partial<Fee> = {};
    
    if (updateFeeDto.fee !== undefined) updated.fee = updateFeeDto.fee;
    if (updateFeeDto.receiveFee !== undefined) updated.receiveFee = updateFeeDto.receiveFee;
    if (updateFeeDto.remainingFee !== undefined) updated.remainingFee = updateFeeDto.remainingFee;
    if (updateFeeDto.feeStatus !== undefined) updated.feeStatus = updateFeeDto.feeStatus;
    if (updateFeeDto.paperFund !== undefined) updated.paperFund = updateFeeDto.paperFund;
    if (updateFeeDto.receiptNo !== undefined) updated.receiptNo = updateFeeDto.receiptNo;
    if (updateFeeDto.paidAt !== undefined) updated.paidAt = new Date(updateFeeDto.paidAt);
    
    if (updateFeeDto.student !== undefined) {
      if (updateFeeDto.student === null) {
        updated.student = null as any;
      } else {
        const student = await this.studentService.findOne(updateFeeDto.student);
        if (!student) throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
        updated.student = student as any;
      }
    }

    if (updateFeeDto.class !== undefined) {
      if (updateFeeDto.class === null) {
        updated.class = null as any;
      } else {
        const classEntity = await this.classRepository.findOne({ where: { id: updateFeeDto.class } });
        if (!classEntity) throw new HttpException('Class not found', HttpStatus.NOT_FOUND);
        updated.class = classEntity as any;
      }
    }

    if (updateFeeDto.cource !== undefined) {
      if (updateFeeDto.cource === null) {
        updated.cource = null as any;
      } else {
        const courceEntity = await this.courceRepository.findOne({ where: { id: updateFeeDto.cource } });
        if (!courceEntity) throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
        updated.cource = courceEntity as any;
      }
    }

    // Recalculate remaining fee and status if fee or receiveFee changed
    if (updateFeeDto.fee !== undefined || updateFeeDto.receiveFee !== undefined) {
      const newFee = updateFeeDto.fee ?? existing.fee;
      const newReceiveFee = updateFeeDto.receiveFee ?? existing.receiveFee;
      const newRemainingFee = Math.max(newFee - newReceiveFee, 0);
      
      let newFeeStatus: 'paid' | 'partial' | 'unpaid';
      if (newRemainingFee === 0) {
        newFeeStatus = 'paid';
      } else if (newReceiveFee > 0) {
        newFeeStatus = 'partial';
      } else {
        newFeeStatus = 'unpaid';
      }
      
      updated.remainingFee = newRemainingFee;
      updated.feeStatus = newFeeStatus;
    }

    await this.feeRepository.update(id, updated);
    return this.findOne(id);
  }

  async remove(id: string) {
    const existing = await this.feeRepository.findOne({ where: { id } });
    if (!existing) {
      throw new HttpException('Fee not found', HttpStatus.NOT_FOUND);
    }
    await this.feeRepository.delete(id);
    return { message: 'Fee deleted successfully' };
  }

  async getPageData(options: FeesPageOptionsDto) {
    const queryBuilder = this.feeRepository
      .createQueryBuilder('fee')
      .leftJoinAndSelect('fee.student', 'student')
      .leftJoinAndSelect('fee.class', 'class')
      .leftJoinAndSelect('fee.cource', 'cource');

    // Ordering
    switch (options.orderBy) {
      case 'fee':
        queryBuilder.orderBy('fee.fee', options.order);
        break;
      case 'student':
        queryBuilder.orderBy('student.name', options.order);
        break;
      case 'class':
        queryBuilder.orderBy('class.name', options.order);
        break;
      case 'cource':
        queryBuilder.orderBy('cource.name', options.order);
        break;
      default:
        queryBuilder.orderBy('fee.paidAt', options.order);
        break;
    }

    // Select minimal fields
    queryBuilder.select([
      'fee.id',
      'fee.fee',
      'fee.receiveFee',
      'fee.remainingFee',
      'fee.feeStatus',
      'fee.paidAt',
      'student.id',
      'student.name',
      'class.id',
      'class.name',
      'cource.id',
      'cource.name',
    ]);

    // Search
    if (options.search) {
      const search = options.search.trim();
      queryBuilder.andWhere(
        '(student.name LIKE :search OR class.name LIKE :search OR cource.name LIKE :search)',
        { search: `%${search}%` },
      );
    }

    // Filters
    if (options.selectclass) {
      queryBuilder.andWhere('class.id = :classId', { classId: options.selectclass });
    }
    if (options.selectcource) {
      queryBuilder.andWhere('cource.id = :courceId', { courceId: options.selectcource });
    }
    if (options.selectstudent) {
      queryBuilder.andWhere('student.id = :studentId', { studentId: options.selectstudent });
    }
    if (options.studentCode) {
      queryBuilder.andWhere('student.student_id = :studentCode', { studentCode: options.studentCode });
    }

    // Status filter
    if (options.status) {
      queryBuilder.andWhere('fee.feeStatus = :status', { status: options.status });
    }

    // Pagination
    if (options.page > 1) {
      options.skip = (options.page - 1) * options.take;
    }
    queryBuilder.skip(options.skip).take(options.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto: options });
    return new PageDto<any>(entities, pageMetaDto);
  }

  async getStudentFeeSummary(studentId: string): Promise<FeeSummaryDto> {
    const student = await this.studentService.findOne(studentId);
    const fees = await this.feeRepository.find({ where: { student: { id: studentId } as any } });
    const totalPaid = fees.reduce((sum, f) => sum + Number(f.receiveFee), 0);
    const totalFee = fees.reduce((sum, f) => sum + Number(f.fee), 0);
    const remaining = Math.max(totalFee - totalPaid, 0);
    const status: FeeSummaryDto['status'] = totalPaid === 0
      ? 'unpaid'
      : remaining === 0
      ? 'paid'
      : 'partial';

    return {
      studentId: student.id,
      classId: student.class?.id,
      courceId: student.cource?.id ?? null,
      studentName: student.name,
      className: student.class?.name ?? '',
      courceName: student.cource?.name ?? null,
      totalFee,
      totalPaid,
      remaining,
      status,
    };
  }
} 