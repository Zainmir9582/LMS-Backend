import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { DatesheetService } from './datesheet.service';
import { CreateDatesheetDto } from './dto/create-datesheet.dto';
import { UpdateDatesheetDto } from './dto/update-datesheet.dto';
import { CreateDatesheetItemDto } from './dto/create-datesheet-item.dto';

@Controller('datesheet')
export class DatesheetController {
  constructor(private readonly datesheetService: DatesheetService) {}

  @Post()
  create(@Body() dto: CreateDatesheetDto) {
    return this.datesheetService.create(dto);
  }

  @Get()
  findAll() {
    return this.datesheetService.findAll();
  }

  @Post(':id/items')
  addItem(@Param('id') id: string, @Body() dto: CreateDatesheetItemDto) {
    return this.datesheetService.addItem(id, dto);
  }

  @Get(':id/print')
  print(@Param('id') id: string) {
    return this.datesheetService.printDatesheet(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.datesheetService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateDatesheetDto) {
    return this.datesheetService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.datesheetService.remove(id);
  }
}
