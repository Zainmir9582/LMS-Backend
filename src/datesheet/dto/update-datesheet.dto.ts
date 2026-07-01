import { PartialType } from '@nestjs/mapped-types';
import { CreateDatesheetDto } from './create-datesheet.dto';

export class UpdateDatesheetDto extends PartialType(CreateDatesheetDto) {}
