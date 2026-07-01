import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ResultsService } from './results.service';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';
import { BulkCreateResultDto } from './dto/bulk-create-result.dto';
import { CreateGradingCriteriaDto } from './dto/create-grading-criteria.dto';
import { UpdateGradingCriteriaDto } from './dto/update-grading-criteria.dto';

@Controller('results')
export class ResultsController {
  constructor(private readonly resultsService: ResultsService) {}

  @Post()
  create(@Body() dto: CreateResultDto) {
    return this.resultsService.create(dto);
  }

  @Post('bulk')
  bulkCreate(@Body() dto: BulkCreateResultDto) {
    return this.resultsService.bulkCreate(dto.results || []);
  }

  @Get()
  findAll() {
    return this.resultsService.findAll();
  }

  @Get('print/student/:studentId')
  printStudent(@Param('studentId') studentId: string) {
    return this.resultsService.printStudentResult(studentId);
  }

  @Post('grading-criteria')
  createCriteria(@Body() dto: CreateGradingCriteriaDto) {
    return this.resultsService.createCriteria(dto);
  }

  @Get('grading-criteria/list')
  getCriteria() {
    return this.resultsService.getCriteria();
  }

  @Patch('grading-criteria/:id')
  updateCriteria(@Param('id') id: string, @Body() dto: UpdateGradingCriteriaDto) {
    return this.resultsService.updateCriteria(id, dto);
  }

  @Delete('grading-criteria/:id')
  removeCriteria(@Param('id') id: string) {
    return this.resultsService.removeCriteria(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resultsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateResultDto) {
    return this.resultsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resultsService.remove(id);
  }
}
