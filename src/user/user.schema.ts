import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({
    required: true,
    type: String,
    min: [3, 'Name must be at least 3 characters'],
    max: [30, 'Nmem must be be last at 30 characters'],
  })
  name: string;
  @Prop({
    required: true,
    type: String,
    unique: true,
  })
  email: string;
  @Prop({
    required: true,
    type: String,
    min: [3, 'password must be at least 3 characters'],
    max: [20, 'password must be be last at 20 characters'],
  })
  password: string;
  @Prop({
    required: true,
    type: String,
    enum: ['user', 'admin'],
  })
  role: string;
  @Prop({
    type: String,
  })
  avatar: string;
  @Prop({
    type: Number,
  })
  age: number;
  @Prop({
    type: String,
  })
  phoneNumber: string;
  @Prop({
    type: String,
  })
  address: string;
  @Prop({
    type: Boolean,
    enum: [false, true],
  })
  active: boolean;
  @Prop({
    type: String,
  })
  VerificationCode: string;
  @Prop({
    type: String,
    enum: ['male', 'female'],
  })
  gender: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
