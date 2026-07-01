import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClassService } from './class.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { ClassPageOptionsDto } from './dto/class-page-option.dto';
import {Query } from '@nestjs/common';
import { CourceService } from 'src/cource/cource.service';
import { HttpException, HttpStatus } from '@nestjs/common'; 
@Controller('class')
export class ClassController {
  constructor(private readonly classService: ClassService,
    private readonly courceService: CourceService,
  ) {}

  @Post()
  create(@Body() createClassDto: CreateClassDto) {
    return this.classService.create(createClassDto);
  }

  @Get()
  findAll() {
    return this.classService.findAll();
  }

  @Get('/pagedata')
async getAllclass(@Query() classPageOptionsDto: ClassPageOptionsDto) {
  const pagedata = await this.classService.getAllPageData(classPageOptionsDto);
  const classes = await this.classService.findAll();
  
  const data = { pagedata, classes };
  return data;
}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.classService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClassDto: UpdateClassDto) {
    return this.classService.update(id, updateClassDto);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.classService.remove(id);
  }
}
