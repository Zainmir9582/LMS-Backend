import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Datesheet } from 'src/db/entities/datesheet.entity';
import { DatesheetItem } from 'src/db/entities/datesheet-item.entity';
import { Class } from 'src/db/entities/class.entity';
import { Cource } from 'src/db/entities/cource.entity';
import { Subject } from 'src/db/entities/subject.entity';
import { DatesheetService } from './datesheet.service';
import { DatesheetController } from './datesheet.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Datesheet, DatesheetItem, Class, Cource, Subject])],
  controllers: [DatesheetController],
  providers: [DatesheetService],
})
export class DatesheetModule {}
