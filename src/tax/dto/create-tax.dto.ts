import { IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTexDto {
  @IsNumber({}, { message: 'taxPrice must be a number' })
  @IsOptional()
  @ApiProperty({
    description: 'The tax price applied to the order',
    type: Number,
    required: false,
  })
  taxPrice: number;
  @IsNumber({}, { message: 'shippingPrice must be a number' })
  @IsOptional()
  @ApiProperty({
    description: 'The shipping price applied to the order',
    type: Number,
    required: false,
  })
  shippingPrice: number;
}