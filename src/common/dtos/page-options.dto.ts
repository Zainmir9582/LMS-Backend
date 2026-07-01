import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { Order } from '../constants';

export class PageOptionsDto {
  @IsEnum(Order)
  @IsOptional()
  order?: Order = Order.DESC;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  page?: number = 1;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  @IsOptional()
  take?: number = 5;

  @IsOptional()
  orderBy?: string = '';

  @IsOptional()
  search?: string = '';

  @IsOptional()
  role?: string = '';

  @IsOptional()
  is_active?: string = '';

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  skip?: number = 0;
}
