import { IsOptional, max } from 'class-validator';
import { PageOptionsDto } from 'src/common/dtos/page-options.dto';

export class CourcePageOptionsDto extends PageOptionsDto {
  @IsOptional()
  selectname?: string;

  @IsOptional()
  selectis_active?: string;

  

  @IsOptional()
  orderBy?: 'name' | 'id' = 'name';
}
