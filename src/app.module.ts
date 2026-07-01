import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './db/entities/user.entity'; // Ensure this path is correct
import { UserModule } from './user/user.module';
import { StudentModule } from './student/student.module';
import { Student } from './db/entities/student.entity';
import { ClassModule } from './class/class.module';
import { CourceModule } from './cource/cource.module';
import { Class } from './db/entities/class.entity';
import { Cource } from './db/entities/cource.entity';
import { dataSourceOptions } from './db/data-source';
import { dataSourceOptionsSQLite } from './db/data-source-sqlite';
import { TeacherModule } from './teacher/teacher.module';
import { FeesModule } from './fees/fees.module';
import { SubjectModule } from './subject/subject.module';
import { DatesheetModule } from './datesheet/datesheet.module';
import { ResultsModule } from './results/results.module';
 
 @Module({
   imports: [
     TypeOrmModule.forRoot(
       // Use SQLite for development (comment out to use MySQL)
       // dataSourceOptionsSQLite,
       // Use MySQL for production (uncomment to use MySQL)
       dataSourceOptions,
     ),
     UserModule,
     StudentModule,
     ClassModule,
     CourceModule,
     TeacherModule, // Import the UserModule
     FeesModule,
    SubjectModule,
    DatesheetModule,
    ResultsModule,
   ],
   controllers: [AppController],
   providers: [AppService],
 })
 export class AppModule {}
