import { IsBoolean, IsDate, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @IsOptional()
  @ApiProperty({
    description: 'The ID of the user placing the order',
  })
  shippingAddress: string;
}
export class AcceptOrderCashDto {
  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    description: 'Indicates if the order is paid',
  })
  isPaid: boolean;
  @IsOptional()
  @IsDate()
  @ApiProperty({
    description: 'The date when the order was paid',
  })
  paidAt: Date;
  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    description: 'Indicates if the order is delivered',
  })
  isDeliverd: boolean;
  @IsOptional()
  @IsDate()
  @ApiProperty({
    description: 'The date when the order was delivered',
  })
  deliverdAt: Date;
}
