import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { TeacherPageOptionsDto } from './dto/teacher-page-option.dto';
import { Query } from '@nestjs/common';
import { SubjectService } from 'src/subject/subject.service';
@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService,
    private readonly subjectService: SubjectService,
  ) {}

  @Post()
  create(@Body() createTeacherDto: CreateTeacherDto) {
    return this.teacherService.create(createTeacherDto);
  }

  @Get()
  findAll() {
    return this.teacherService.findAll();
  }

  @Get('/pagedata')
async getAllclass(@Query() teacherPageOptionsDto: TeacherPageOptionsDto) {
  const pagedata = await this.teacherService.getAllPageData(teacherPageOptionsDto);
  const teachers = await this.teacherService.findAll();
  const subjects = await this.subjectService.findAll();
  
  const data = { pagedata, teachers,subjects };
  return data;
}
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teacherService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeacherDto: UpdateTeacherDto) {
    return this.teacherService.update(id, updateTeacherDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teacherService.remove(id);
  }
}
