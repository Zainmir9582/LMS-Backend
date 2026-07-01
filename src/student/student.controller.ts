import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentPageOptionsDto } from './dto/student-page-option.dto';
import { HttpException } from '@nestjs/common';
import { CourceService } from 'src/cource/cource.service';
import { ClassService } from 'src/class/class.service';

@Controller('student')
export class StudentController {
  constructor(
    private readonly studentService: StudentService,
    private readonly courceService: CourceService,
    private readonly classService: ClassService,
  ) {}

  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @Get()
  findAll() {
    return this.studentService.findAll();
  }

  @Get('/pagedata')
  async getAllstudent(@Query() studentPageOptionsDto: StudentPageOptionsDto) {
    
    const pagedata = await this.studentService.getAllPageData(
      studentPageOptionsDto,
    );
    const courses = await this.courceService.findAll();
    const classes = await this.classService.findAll();
    if (pagedata === null) {
      throw new HttpException('No pageData Record Found', 404);
    }
    const data = { pagedata, courses, classes };
    return data;
  }

  @Get('print/list')
  printList(@Query('classId') classId?: string) {
    return this.studentService.getPrintableList(classId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.update(id, updateStudentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentService.remove(id);
  }
}
