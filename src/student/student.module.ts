import { Module,forwardRef  } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { Student } from '../db/entities/student.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassModule } from 'src/class/class.module';
import { CourceModule } from 'src/cource/cource.module';

@Module({
  imports:[TypeOrmModule.forFeature([Student]),
  forwardRef(() => ClassModule),
    CourceModule,
],
  controllers: [StudentController],
  providers: [StudentService],
  exports: [StudentService],
})
export class StudentModule {}
