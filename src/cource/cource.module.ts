import { Module, forwardRef  } from '@nestjs/common';
import { CourceService } from './cource.service';
import { CourceController } from './cource.controller';
import { Cource } from '../db/entities/cource.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Class } from 'src/db/entities/class.entity';
import { ClassModule } from 'src/class/class.module';
import {StudentModule} from 'src/student/student.module'
@Module({
  imports: [
    TypeOrmModule.forFeature([Cource, Class]),
    forwardRef(() => ClassModule),
    forwardRef(() => StudentModule),
  ],
  controllers: [CourceController],
  providers: [CourceService],
  exports:[CourceService],
  
})
export class CourceModule {}
