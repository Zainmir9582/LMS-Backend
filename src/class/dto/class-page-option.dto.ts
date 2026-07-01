import { IsOptional, max } from 'class-validator';
import { PageOptionsDto } from 'src/common/dtos/page-options.dto';

export class ClassPageOptionsDto extends PageOptionsDto {
  @IsOptional()
  selectconvocation?: string;

  @IsOptional()
  selectlocation?: string;

  @IsOptional()
  selectclass?: string;

  @IsOptional()
  selectstatus?: string;

  @IsOptional()
  selectcource?: string;

  

  @IsOptional()
  selectis_active?: string;

  // @IsOptional()
  // phaseorder: 'ASC' | 'DESC';

  // @IsOptional()
  // is_activeorder: 'ASC' | 'DESC';
}
