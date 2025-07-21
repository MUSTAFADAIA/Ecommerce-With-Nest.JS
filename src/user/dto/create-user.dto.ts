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

export class CreateUserDto {
  //Name
  @IsString({ message: 'Name must be a string' })
  @MinLength(3, { message: 'Name must be at leat 3 characters' })
  @MaxLength(30, { message: 'Name must be at most 30 characters' })
  name: string;
  //Email
  @IsString({ message: 'Email must be a string' })
  @MinLength(0, { message: 'Email must be Email' })
  @IsEmail({}, { message: 'Email is not valid' })
  email: string;
  //Password
  @IsString({ message: 'password must be a string' })
  @MinLength(3, { message: 'password must be at leat 3 characters' })
  @MaxLength(20, { message: 'password must be at most 20 characters' })
  password: string;
  //role
  @IsEnum(['user', 'admin'], { message: 'role mast be user or admin' })
  @IsOptional()
  role: string;
  //avatar
  @IsString({ message: 'avatar must be a string' })
  @IsUrl({}, { message: 'avatar must be a valid URL' })
  @IsOptional()
  avatar: string;
  //age
  @IsNumber({}, { message: 'age mast be a number' })
  @IsOptional()
  age: Number;
  //phoneNumber
  @IsString({ message: 'phoneNumber must be a string' })
  //   @IsPhoneNumber('IS', { message: 'phoneNumber must be a valid phone Numer' })
  @IsOptional()
  phoneNumber: string;
  //address
  @IsString({ message: 'address must be a string' })
  @IsOptional()
  address: string;
  //active
  @IsBoolean({ message: 'active must be a boolean' })
  @IsEnum([true, false], { message: 'active must be a fales or true' })
  @IsOptional()
  active: boolean;
  //VerificationCode
  @IsString({ message: 'VerificationCode must be a string' })
  @IsOptional()
  @Length(6, 6, { message: 'VerificationCode must be 6 characters' })
  VerificationCode: string;
  //gender
  @IsEnum(['male', 'female'], { message: 'gender must be male or female' })
  @IsOptional()
  gender: string;
}
