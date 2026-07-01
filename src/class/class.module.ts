import { Module, forwardRef  } from '@nestjs/common';
import { ClassService } from './class.service';
import { ClassController } from './class.controller';
import { Class } from '../db/entities/class.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cource } from 'src/db/entities/cource.entity';
import { CourceModule } from 'src/cource/cource.module';
@Module({
  imports:[TypeOrmModule.forFeature([Class, Cource]),forwardRef(() => CourceModule)],
  controllers: [ClassController],
  providers: [ClassService],
  exports:[ClassService],
})
export class ClassModule {}
