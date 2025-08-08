import {
  IsArray,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  Min,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @IsString({ message: 'Title Must be a String' })
  @MinLength(3, { message: 'Title must be at least 3 characters' })
  
  @ApiProperty({
    description: 'The title of the product',
    type: String,
    minLength: 3,
  })
  title: string;

  @IsString({ message: 'Description Must be a String' })
  @MinLength(20, { message: 'Description must be at least 20 characters' })
  @ApiProperty({
    description: 'The description of the product',
    type: String,
    minLength: 20,
  })
  description: string;

  @IsNumber({}, { message: 'quantity Must be a Number' })
  @Min(1, { message: 'quantity must be at least 1 characters' })
@ApiProperty({
    description: 'The quantity of the product',})
  quantity: number;

  @IsString({ message: 'imageCover Must be a String' })
  @IsUrl({}, { message: 'imageCover Must be a URL' })
  @ApiProperty({
    description: 'The cover image URL of the product',
    type: String,
  })
  imageCover: string;

  @IsArray({ message: 'Images Must be an array' })
  @IsOptional()
  @ApiProperty({
    description: 'The images of the product',})
  images: string[];

  @IsNumber({}, { message: 'sold Must be a Number' })
  @IsOptional()
  @ApiProperty({
    description: 'The number of products sold',})
  sold: number;

  @IsNumber({}, { message: 'Price Must be a Number' })
  @Min(1, { message: 'price must be at least 1 L.E' })
  @Max(20000, { message: 'price must be at max 20000 L.E' })
  @ApiProperty({
    description: 'The price of the product',
    type: Number,
    minimum: 1,
    maximum: 20000,
  })
  price: number;

  @IsOptional()
  @IsNumber({}, { message: 'priceAfterDiscount Must be a Number' })
  @Min(1, { message: 'priceAfterDiscount must be at least 1 L.E' })
  @Max(20000, { message: 'priceAfterDiscount must be at max 20000 L.E' })
  @ApiProperty({
    description: 'The price after discount of the product',
    type: Number,
    minimum: 1,
    maximum: 20000,
  })
  priceAfterDiscount: number;

  @IsOptional()
  @IsArray({ message: 'Images Must be an array' })
  @ApiProperty({
    description: 'The colors available for the product',})
  colors: string[];

  @IsString({ message: 'category Must be a String' })
  @IsMongoId({ message: 'category Must be MongoId' })
  @ApiProperty({
    description: 'The category ID of the product',
    type: String,
  })
  category: string;

  @IsOptional()
  @IsString({ message: 'subCategory Must be a String' })
  @IsMongoId({ message: 'subCategory Must be MongoId' })
  @ApiProperty({
    description: 'The subcategory ID of the product',
    type: String,
  })
  subCategory: string;

  @IsOptional()
  @IsString({ message: 'brand Must be a String' })
  @IsMongoId({ message: 'brand Must be MongoId' })
  @ApiProperty({
    description: 'The brand ID of the product',
    type: String,
  })
  brand: string;
}