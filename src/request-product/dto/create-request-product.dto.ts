import {
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRequestProductDto {
  @IsString({ message: 'title must be a string' })
  @ApiProperty({
    description: 'The title of the product request',})
  titleNeed: string;

  @IsString({ message: 'details must be a string' })
  @MinLength(5, { message: 'Details must be at least 5 characters' })
  @ApiProperty({
    description: 'The details of the product request',
    minLength: 5,
  })
  details: string;
  @IsNumber({}, { message: 'qauntity must be a number' })
  @Min(1, { message: 'Qauntity must be at least 1 product' })
  @ApiProperty({
    description: 'The quantity of the product requested',
    type: Number,
    minimum: 1,
  })
  qauntity: number;
  @IsOptional()
  @IsString({ message: 'category must be a string' })
  @ApiProperty({
    description: 'The category ID of the product request',
    type: String,
    required: false,
  })
  category: string;
}