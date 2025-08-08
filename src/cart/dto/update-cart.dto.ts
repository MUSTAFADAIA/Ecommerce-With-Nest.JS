import { IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCartItemsDto {
  @IsOptional()
  @IsNumber({}, { message: 'Quantity must be a number' })
  @Min(1, { message: 'Quantity must be greater than 0' })
  @ApiProperty({
    description: 'The quantity of the item in the cart',
    type: Number,
    minimum: 1,
    required: false,
  })
  quantity: number;

  @IsOptional()
  @IsString({ message: 'Color must be a string' })
  @ApiProperty({
    description: 'The color of the item in the cart',
    type: String,
    required: false,
  })
  color: string;
}