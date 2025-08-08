import {
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @IsString({ message: 'name must be a string' })
  @MinLength(3, { message: 'name must be at least 3 characters' })
  @MaxLength(30, { message: 'name must be at most 30 characters' })
  @ApiProperty({
    description: 'The name of the category',
    type: String,
    minLength: 3,
    maxLength: 30,
  })
  name: string;

  @IsString({ message: 'image must be a string' })
  @IsUrl({}, { message: 'image must be a valid URL' })
  @IsOptional()
  @ApiProperty({
    description: 'The image URL of the category',
    type: String,
    required: false,
  })
  image: string;
}