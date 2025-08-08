import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UseGuards,
  Query,
  Req,
  UseFilters,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { I18n, I18nContext, I18nValidationExceptionFilter } from 'nestjs-i18n';
import { Roles } from './decorator/roles.decorator';
import { AuthGuard } from './guard/auth.guard';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('users') 
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //  @docs   Admin Can Create User
  //  @Route  POST /api/v1/user
  //  @access Private [admin]
  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @Roles(['admin'])
  @UseGuards(AuthGuard)
  @UseFilters(new I18nValidationExceptionFilter())
  create(
    @Body(new ValidationPipe({ forbidNonWhitelisted: true }))
    createUserDto: CreateUserDto,
    @I18n() i18n: I18nContext,
  ) {
    return this.userService.create(createUserDto, i18n);
  }
  //  @docs   Admin Can Get All Users
  //  @Route  GET /api/v1/user
  //  @access Private [admin]
  @Get()
   @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'List of users returned successfully' })
  @Roles(['admin'])
  @UseGuards(AuthGuard)
  findAll(@Query() query, @I18n() i18n: I18nContext) {
    return this.userService.findAll(query, i18n);
  }
  //  @docs   Admin Can Get Single User
  //  @Route  GET /api/v1/user/:id
  //  @access Private [admin]
  @Get(':id')
   @ApiOperation({ summary: 'Get one users' })
  @ApiResponse({ status: 200, description: ' user returned successfully' })
  @Roles(['admin'])
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string, @I18n() i18n: I18nContext) {
    return this.userService.findOne(id, i18n);
  }
  //  @docs   Admin Can Update Single User
  //  @Route  UPDATE /api/v1/user/:id
  //  @access Private [admin]
  @Patch(':id')
   @ApiOperation({ summary: 'update one user' })
  @ApiResponse({ status: 200, description: 'User update successfully' })
  @Roles(['admin'])
  @UseGuards(AuthGuard)
  update(
    @Param('id') id: string,
    @Body(new ValidationPipe({ forbidNonWhitelisted: true }))
    updateUserDto: UpdateUserDto,
    @I18n() i18n: I18nContext,
  ) {
    return this.userService.update(id, updateUserDto, i18n);
  }
  //  @docs   Admin Can Delete Single User
  //  @Route  DELETE /api/v1/user/:id
  //  @access Private [admin]
  @Delete(':id')
  @ApiOperation({ summary: 'Delete one user' })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  @Roles(['admin'])
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string, @I18n() i18n: I18nContext) {
    return this.userService.remove(id, i18n);
  }
}

@Controller('v1/userMe')
export class UserMeController {
  constructor(private readonly userService: UserService) {}

  // For User
  //  @docs   Any User can get data on your account
  //  @Route  GET /api/v1/user/me
  //  @access Private [user, admin]
  @Get()
  @ApiOperation({ summary: 'Get my account data' })
  @ApiResponse({ status: 200, description: 'User data returned successfully' })
  @Roles(['user', 'admin'])
  @UseGuards(AuthGuard)
  getMe(@Req() req, @I18n() i18n: I18nContext) {
    return this.userService.getMe(req.user, i18n);
  }
  //  @docs   Any User can update data on your account
  //  @Route  PATCH /api/v1/user/me
  //  @access Private [user, admin]
  @Patch()
  @ApiOperation({ summary: 'Update my account data' })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  @Roles(['user', 'admin'])
  @UseGuards(AuthGuard)
  updateMe(
    @Req() req,
    @Body(new ValidationPipe({ forbidNonWhitelisted: true }))
    updateUserDto: UpdateUserDto,
    @I18n() i18n: I18nContext,
  ) {
    return this.userService.updateMe(req.user, updateUserDto, i18n);
  }
  //  @docs   Any User can unActive your account
  //  @Route  DELETE /api/v1/user/me
  //  @access Private [user]
  @Delete()
  @ApiOperation({ summary: 'Delete my account' })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  @Roles(['user'])
  @UseGuards(AuthGuard)
  deleteMe(@Req() req, @I18n() i18n: I18nContext) {
    return this.userService.deleteMe(req.user, i18n);
  }
}