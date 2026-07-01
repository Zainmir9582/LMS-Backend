import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Result } from 'src/db/entities/result.entity';
import { Student } from 'src/db/entities/student.entity';
import { Class } from 'src/db/entities/class.entity';
import { Cource } from 'src/db/entities/cource.entity';
import { GradingCriteria } from 'src/db/entities/grading-criteria.entity';
import { ResultsService } from './results.service';
import { ResultsController } from './results.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Result, Student, Class, Cource, GradingCriteria])],
  controllers: [ResultsController],
  providers: [ResultsService],
})
export class ResultsModule {}
