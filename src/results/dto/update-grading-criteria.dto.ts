import { PartialType } from '@nestjs/mapped-types';
import { CreateGradingCriteriaDto } from './create-grading-criteria.dto';

export class UpdateGradingCriteriaDto extends PartialType(CreateGradingCriteriaDto) {}
