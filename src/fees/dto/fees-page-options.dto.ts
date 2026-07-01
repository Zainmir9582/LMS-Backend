import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { Order } from 'src/common/constants';

export class FeesPageOptionsDto {
  @IsEnum(Order)
  @IsOptional()
  order?: Order = Order.DESC;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  page?: number = 1;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  take?: number = 5;

  @IsOptional()
  orderBy?: 'paidAt' | 'fee' | 'student' | 'class' | 'cource' = 'paidAt';

  @IsOptional()
  @IsString()
  search?: string = '';

  @IsOptional()
  @IsString()
  selectclass?: string;

  @IsOptional()
  @IsString()
  selectcource?: string;

  @IsOptional()
  @IsString()
  selectstudent?: string;

  @IsOptional()
  @IsString()
  studentCode?: string;

  @IsOptional()
  @IsString()
  status?: 'paid' | 'partial' | 'unpaid';

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  skip?: number = 0;
} 