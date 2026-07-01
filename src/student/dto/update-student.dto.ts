import { IsOptional, IsString, IsNumber, IsDateString, IsUUID, ValidateIf, IsBoolean } from 'class-validator';

export class UpdateStudentDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  f_name?: string;

  @IsOptional()
  @IsString()
  gender?: string;

  @IsOptional()
  @IsString()
  Address?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsNumber()
  fee?: number;

  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;

  @IsOptional()
  @IsUUID()
  class?: string;

  @IsOptional()
  @ValidateIf((_, value) => value !== null)
  @IsUUID()
  cource?: string | null;

  @IsBoolean()
  isActive?: boolean;
}
