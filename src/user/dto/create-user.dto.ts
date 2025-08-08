import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUrl,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  // Name
  @IsString({ message: i18nValidationMessage('dto.IS_STRING') }) // 'Name must be a string'
  @MinLength(3, { message: i18nValidationMessage('dto.MinLength') }) // 'Name must be at least 3 characters'
  @MaxLength(30, { message: i18nValidationMessage('dto.MaxLength') }) // 'Name must be at most 30 characters'
  @ApiProperty({
    description: 'The name of the user',
    example: 'Mustafa daia',
  })
  name: string;
  // Email
  @IsString({ message: 'Email must be a string' })
  @MinLength(0, { message: 'Thie Email Must be Required' })
  @IsEmail({}, { message: 'Email is not valid' })
  @ApiProperty({
    description: 'The email of the user',
    example: 'mustafa120202802@gmail.com',
  })
  email: string;
  // Password
  @IsString({ message: 'Password must be a string' })
  @MinLength(3, { message: 'password must be at least 3 characters' })
  @MaxLength(20, { message: 'password must be at most 20 characters' })
  password: string;
  // Role
  @IsEnum(['user', 'admin'], { message: 'role must be user or admin' })
  @MinLength(0, { message: 'Thie role Must be Required' })
  @IsOptional()
  @ApiProperty({
    description: 'The role of the user',
    example: 'admin',
    enum: ['user', 'admin'],
  })
  role: string;
  // Avatar
  @IsString({ message: 'avatar must be a string' })
  @IsUrl({}, { message: 'avatar must be a valid URL' })
  @IsOptional()
  @ApiProperty({
    description: 'The avatar URL of the user',
    example: 'https://example.com/avatar.jpg',
  })
  avatar: string;
  //   Age
  @IsNumber({}, { message: 'age must be a number' })
  @IsOptional()
  @ApiProperty({
    description: 'The age of the user',
    example: 25,
    required: false,
  })
  age: number;
  // PhoneNumber
  @IsString({ message: 'phoneNumber must be a string' })
  @IsPhoneNumber('EG', {
    message: 'phoneNumber must be a Egyptian phone number',
  })
  @IsOptional()
  @ApiProperty({
    description: 'The phone number of the user',
    example: '+201234567890',
    required: false,
  })
  phoneNumber: string;
  // Address
  @IsString({ message: 'address must be a string' })
  @IsOptional()
  @ApiProperty({
    description: 'The address of the user',
    example: '123 Main St, Cairo, Egypt',
    required: false,
  })
  address: string;
  // Active
  @IsBoolean({ message: 'active must be a boolean' })
  @IsEnum([true, false], { message: 'active must be true or false' })
  @IsOptional()
  @ApiProperty({
    description: 'Indicates if the user is active',
    example: true,
    required: false,
  })
  active: boolean;
  // VerificationCode
  @IsString({ message: 'verificationCode must be a string' })
  @IsOptional()
  @Length(6, 6, { message: 'verificationCode must be 6 characters' })
  @ApiProperty({
    description: 'The verification code for the user',
    example: '123456',
    required: false,
  })
  verificationCode: string;
  // Gender
  @IsEnum(['male', 'female'], { message: 'gender must be male or female' })
  @IsOptional()
  @ApiProperty({
    description: 'Enter gender user'})
  gender: string;
}
