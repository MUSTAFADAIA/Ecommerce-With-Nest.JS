import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    //bussiness logic
    const isUserExist = await this.userModel.findOne({
      email: createUserDto.email,
    });
    if (isUserExist) {
      throw new HttpException('user alreade exist ', 400);
    }
    //hash
    const password = await bcrypt.hash(createUserDto.password, saltOrRounds);
    const user = {
      password,
      role: createUserDto.role ?? 'user',
      active: true,
    };

    return this.userModel.create({ ...createUserDto, ...user });
  }

  async findAll(query) {
    const {
      _limit = 1000_000_000,
      skip = 0,
      sort = 'asc',
      name,
      email,
      role,
    } = query;

    if (Number.isNaN(Number(+_limit))) {
      throw new HttpException('Invalid limit', 400);
    }

    if (Number.isNaN(Number(+skip))) {
      throw new HttpException('Invalid skip', 400);
    }

    if (!['asc', 'desc'].includes(sort)) {
      throw new HttpException('Invalid sort', 400);
    }

    // or=> whare by all keyword, RegExp=> whare by any keyword
    const users = await this.userModel
      .find()
      .skip(skip)
      .limit(_limit)
      .where('name', new RegExp(name, 'i'))
      .where('email', new RegExp(email, 'i'))
      .where('role', new RegExp(role, 'i'))
      .sort({ name: sort })
      .select('-password -__v')
      .exec();
    return {
      status: 200,
      length: users.length,
      data: users,
    };
  }

  async findOne(id: string): Promise<{ status: number; data: User }> {
    const user = await this.userModel.findById(id).select('-password -__v');
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return {
      status: 200,
      data: user,
    };
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const userExist = await this.userModel
      .findById(id)
      .select('-password -__v');
    if (!userExist) {
      throw new NotFoundException('user not found');
    }
    let user = {
      ...updateUserDto,
    };
    if (updateUserDto.password) {
      const password = await bcrypt.hash(updateUserDto.password, saltOrRounds);
      user = {
        ...user,
        password,
      };
    }
    return {
      status: 200,
      message: 'User update successfully',
      data: await this.userModel.findByIdAndUpdate(id, user, {
        new: true,
      }),
    };
  }

  async remove(id: string): Promise<{ status: number; message: string }> {
    const user = await this.userModel.findById(id).select('-password -__v');
    if (!user) {
      throw new NotFoundException('user not found');
    }
    await this.userModel.findByIdAndDelete(id);
    return {
      status: 200,
      message: 'User deleted successfully',
    };
  }
}
