import { IsString, IsUrl, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSuppliersDto {
  @IsString({ message: 'name must be a string' })
  @MinLength(3, { message: 'name must be at least 3 characters' })
  @MaxLength(100, { message: 'name must be at most 100 characters' })
  @ApiProperty({
    description: 'The name of the supplier',
    type: String,
    minLength: 3,
    maxLength: 100,
  })
  name: string;
  @IsString({ message: 'website must be a string' })
  @IsUrl({}, { message: 'website must be a valid URL' })
  @ApiProperty({
    description: 'The website URL of the supplier',
    type: String,
  })
  website: string;
}