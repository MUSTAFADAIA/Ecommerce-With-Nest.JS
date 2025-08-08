import {
  IsDateString,
  IsNumber,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCouponDto {
  @IsString({ message: 'name must be a string' })
  @MinLength(3, { message: 'name must be at least 3 characters' })
  @MaxLength(100, { message: 'name must be at most 100 characters' })
  @ApiProperty({
    description: 'The name of the coupon',
    type: String,
    minLength: 3,
    maxLength: 100,
  })
  name: string;
  @IsString({ message: 'expireDate must be a string' })
  @IsDateString(
    {},
    {
      message:
        'expireDate must be a valid date string in the format YYYY-MM-DD',
    },
  )
  @ApiProperty({
    description: 'The expiration date of the coupon',
    type: String,
    format: 'date',
  })
  expireDate: string;
  @IsNumber({}, { message: 'discount must be a number' })
  @Min(0, { message: 'discount must be at least 0' })
  @ApiProperty({
    description: 'The discount amount of the coupon',
    type: Number,
    minimum: 0,
  })
  discount: number;
}