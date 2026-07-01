import { PartialType } from '@nestjs/mapped-types';
import { CreateCourceDto } from './create-cource.dto';

export class UpdateCourceDto extends PartialType(CreateCourceDto) {}
