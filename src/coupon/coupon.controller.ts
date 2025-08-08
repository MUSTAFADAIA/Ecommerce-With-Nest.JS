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
  HttpException,
} from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { Roles } from 'src/user/decorator/roles.decorator';
import { AuthGuard } from 'src/user/guard/auth.guard';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Coupon')
@Controller('coupon')
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  //  @docs   Admin Can create a new Coupon
  //  @Route  POST /api/v1/coupon
  //  @access Private [Amdin]
  @Post()
  @ApiOperation({ summary: 'Create a new coupon' })
  @ApiResponse({ status: 201, description: 'Coupon created successfully' })
  @Roles(['admin'])
  @UseGuards(AuthGuard)
  create(
    @Body(new ValidationPipe({ forbidNonWhitelisted: true }))
    createCouponDto: CreateCouponDto,
  ) {
    const isExpired = new Date(createCouponDto.expireDate) > new Date();
    if (!isExpired) {
      throw new HttpException("Coupon can't be expired", 400);
    }
    return this.couponService.create(createCouponDto);
  }

  //  @docs   Admin Can get all Coupons
  //  @Route  GET /api/v1/coupon
  //  @access Private [Amdin]
  @Get()
  @ApiOperation({ summary: 'Get all coupons' })
  @ApiResponse({ status: 200, description: 'Coupons retrieved successfully' })
  @Roles(['admin'])
  @UseGuards(AuthGuard)
  findAll() {
    return this.couponService.findAll();
  }

  //  @docs   Admin Can get one Coupon
  //  @Route  GET /api/v1/coupon
  //  @access Private [Amdin]
  @Get(':id')
  @ApiOperation({ summary: 'Get a specific coupon by ID' })
  @ApiResponse({ status: 200, description: 'Coupon retrieved successfully' })
  @Roles(['admin'])
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.couponService.findOne(id);
  }

  //  @docs   Admin can update a coupon
  //  @Route  PATCH /api/v1/coupon
  //  @access Private [admin]
  @Patch(':id')
  @ApiOperation({ summary: 'Update a coupon' })
  @ApiResponse({ status: 200, description: 'Coupon updated successfully' })
  @Roles(['admin'])
  @UseGuards(AuthGuard)
  update(
    @Param('id') id: string,
    @Body(new ValidationPipe({ forbidNonWhitelisted: true }))
    updateCouponDto: UpdateCouponDto,
  ) {
    if (updateCouponDto.expireDate) {
      const isExpired = new Date(updateCouponDto.expireDate) > new Date();
      if (!isExpired) {
        throw new HttpException("Coupon can't be expired", 400);
      }
    }
    return this.couponService.update(id, updateCouponDto);
  }

  //  @docs   Admin can delete a Coupon
  //  @Route  DELETE /api/v1/coupon
  //  @access Private [admin]
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a coupon' })
  @ApiResponse({ status: 200, description: 'Coupon deleted successfully' })
  @Roles(['admin'])
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.couponService.remove(id);
  }
}
