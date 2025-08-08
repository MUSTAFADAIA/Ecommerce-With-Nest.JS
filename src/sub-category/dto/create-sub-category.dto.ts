import { IsMongoId, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SubCreateCategoryDto {
  @IsString({ message: 'name must be a string' })
  @MinLength(3, { message: 'name must be at least 3 characters' })
  @MaxLength(30, { message: 'name must be at most 30 characters' })
  @ApiProperty({
    description: 'The name of the sub-category',
    type: String,
    minLength: 3,
    maxLength: 30,
  })
  name: string;

  @IsString({ message: 'category must be a string' })
  @IsMongoId({ message: 'category must be a valid mongo id' })
  @ApiProperty({
    description: 'The ID of the parent category',
    type: String,
  })
  category: string;
}