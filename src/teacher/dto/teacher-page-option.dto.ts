import { IsOptional, max } from 'class-validator';
import { PageOptionsDto } from 'src/common/dtos/page-options.dto';

export class TeacherPageOptionsDto extends PageOptionsDto {
  @IsOptional()
  selectname?: string;

  @IsOptional()
  selectis_active?: string;

  // @IsOptional()
  // phaseorder: 'ASC' | 'DESC';

  // @IsOptional()
  // is_activeorder: 'ASC' | 'DESC';
}
