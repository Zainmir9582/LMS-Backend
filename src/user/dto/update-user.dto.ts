import { IsEmail, IsNotEmpty, IsOptional, IsString, Length, MinLength } from 'class-validator';

export class UpdateUserDto {
  // @IsNotEmpty()
  @IsString()
  @Length(1, 35)
  name: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 35)
  Last_name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;


  @IsNotEmpty()
  @IsString()
  @Length(1, 10)
  gender: string;

  
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  address: string;
  
  @IsNotEmpty()
  @IsString()
  @MinLength(8) // Minimum password length, adjust as needed
  password: string;

  @IsOptional()
  @IsNotEmpty()
  isActive?: boolean; // Optional since it defaults to true in the entity
}

