import { IsString, IsUrl, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBrandDto {
  @IsString({ message: 'name must be a string' })
  @MinLength(3, { message: 'name must be at least 3 characters' })
  @MaxLength(100, { message: 'name must be at most 100 characters' })
  @ApiProperty({
    description: 'The name of the brand',
    example: 'Nike',
    minLength: 3,
    maxLength: 100,
  })
  name: string;
  @IsString({ message: 'image must be a string' })
  @IsUrl({}, { message: 'image must be a valid URL' })
  @ApiProperty({
    description: 'The URL of the brand image',
    example: 'https://example.com/nike-logo.png',
  })
  image: string;
}