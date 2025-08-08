import {
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
  @IsOptional()
  @IsString({ message: 'reviewText Must be a string' })
  @MinLength(3, { message: 'The reviewText Must be Min 3 characters' })
  @ApiProperty({
    description: 'The text of the review',
    type: String,
    minLength: 3,
    required: false,
  })
  reviewText: string;

  @IsNumber({}, { message: 'rating Must be a Number' })
  @Min(1, { message: 'The rating Must be Min 1 star' })
  @Max(5, { message: 'The rating Must be Min 5 star' })
  @ApiProperty({
    description: 'The rating of the review',
    type: Number,
    minimum: 1,
    maximum: 5,
  })
  rating: number;

  @IsMongoId({ message: 'product Must be a MongoId' })
  @ApiProperty({
    description: 'The ID of the product being reviewed',
    type: String,
  })
  product: string;
}