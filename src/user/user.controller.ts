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
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from './guard/auth.guard';
import { Roles } from './decorator/roles.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //@desc   Post list of user
  //@route   Post/api/v1/user
  //@access   Private [admin]
  @Post()
  @Roles(['admin'])
  @UseGuards(AuthGuard)
  create(
    @Body(new ValidationPipe({ transform: true, forbidNonWhitelisted: true }))
    createUserDto: CreateUserDto,
  ) {
    return this.userService.create(createUserDto);
  }

  //@desc   Get all of user
  //@route   Get/api/v1/user
  //@access   Private [admin]
  @Get()
  @Roles(['admin'])
  @UseGuards(AuthGuard)
  findAll(@Query() query,) {
    return this.userService.findAll(query);
  }

  //@desc   Get one of user
  //@route   Get/api/v1/user/:id
  //@access   Private [admin]
  @Get(':id')
  @Roles(['admin'])
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  //@desc   Update one of user
  //@route   Update/api/v1/user/:id
  //@access   Private [admin]
  @Patch(':id')
  @Roles(['admin'])
  @UseGuards(AuthGuard)
  update(
    @Param('id') id: string,
    @Body(new ValidationPipe({ transform: true, forbidNonWhitelisted: true }))
    updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  //@desc   Delete one of user
  //@route   Delete/api/v1/user/:id
  //@access   Private [admin]
  @Delete(':id')
  @Roles(['admin'])
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}

@Controller('userMe')
export class UserMeController {
  constructor(private readonly userService: UserService) {}

  // For User
  //  @docs   Any User can get data on your account
  //  @Route  GET /api/v1/user/me
  //  @access Private [user, admin]
  @Get()
  @Roles(['user', 'admin'])
  @UseGuards(AuthGuard)
  getMe(@Req() req) {
    return this.userService.getMe(req.user);
  }
//  @docs   Any User can update data on your account
  //  @Route  PATCH /api/v1/user/me
  //  @access Private [user, admin]
  @Patch()
  @Roles(['user', 'admin'])
  @UseGuards(AuthGuard)
  updateMe(
    @Req() req,
    @Body(new ValidationPipe({ forbidNonWhitelisted: true }))
    updateUserDto: UpdateUserDto  ) {
    return this.userService.updateMe(req.user, updateUserDto);
  }
  //  @docs   Any User can unActive your account
  //  @Route  DELETE /api/v1/user/me
  //  @access Private [user]
  @Delete()
  @Roles(['user'])
  @UseGuards(AuthGuard)
  deleteMe(@Req() req) {
    return this.userService.deleteMe(req.user);
  }
}