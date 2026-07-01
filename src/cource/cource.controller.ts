import { Controller, Get, Post, Body, Patch, Param, Delete,Query } from '@nestjs/common';
import { CourceService } from './cource.service';
import { CreateCourceDto } from './dto/create-cource.dto';
import { UpdateCourceDto } from './dto/update-cource.dto';
import { CourcePageOptionsDto } from './dto/cource-page-option.dto';
import {HttpException} from '@nestjs/common';
import { ClassService } from 'src/class/class.service';
@Controller('cource')
export class CourceController {
  constructor(private readonly courceService: CourceService,
    private readonly classService: ClassService,
  ) {}

  @Post()
  create(@Body() createCourceDto: CreateCourceDto) {
    return this.courceService.create(createCourceDto);
  }

  @Get()
  findAll() {
    return this.courceService.findAll();
  }

  @Get('/pagedata')
  async getAllcource(@Query() courcePageOptionsDto: CourcePageOptionsDto) {
    
    const pagedata = await this.courceService.getAllPageData(
      courcePageOptionsDto,
    );
    const courses = await this.courceService.findAll();
    const classes = await this.classService.findAll();
    if (pagedata === null) {
      throw new HttpException('No pageData Record Found', 404);
    }
    const data = { pagedata, courses, classes };
    return data;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courceService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourceDto: UpdateCourceDto) {
    return this.courceService.update(id, updateCourceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courceService.remove(id);
  }
}
