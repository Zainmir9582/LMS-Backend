import { Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from 'src/db/entities/teacher.entity';
import { SubjectModule } from 'src/subject/subject.module';
@Module({
  imports: [TypeOrmModule.forFeature([Teacher]),SubjectModule],
  controllers: [TeacherController],
  providers: [TeacherService],
  exports: [TeacherService],
})
export class TeacherModule {}
