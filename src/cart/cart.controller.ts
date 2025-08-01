import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  UnauthorizedException,
  ValidationPipe,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { Roles } from 'src/user/decorator/roles.decorator';
import { AuthGuard } from 'src/user/guard/auth.guard';
import { UpdateCartItemsDto } from './dto/update-cart.dto';


@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}
  // ======== For User ========== \\

  //  @docs   Can Only User Logged Create Cart and add products in cart
  //  @Route  POST /api/v1/cart/:productId
  //  @access Private [User]
  @Post(':productId')
  @Roles(['user'])
  @UseGuards(AuthGuard)
  create(@Param('productId') productId: string, @Req() req) {
    if (req.user.role.toLowerCase() === 'admin') {
      throw new UnauthorizedException();
    }
    const user_id = req.user._id;
    return this.cartService.create(productId, user_id);
  }

  //  @docs   Can Only User Apply Coupons
  //  @Route  POST /api/v1/cart/coupon
  //  @access Private [User]
  @Post('/coupon/:couponName')
  @Roles(['user'])
  @UseGuards(AuthGuard)
  applyCoupon(@Param('couponName') couponName: string, @Req() req) {
    if (req.user.role.toLowerCase() === 'admin') {
      throw new UnauthorizedException();
    }
    const user_id = req.user._id;
    return this.cartService.applyCoupon(user_id, couponName);
  }

  //  @docs   Can Only User Get Cart
  //  @Route  GET /api/v1/cart
  //  @access Private [User]
  @Get()
  @Roles(['user'])
  @UseGuards(AuthGuard)
  findOneForUser(@Req() req) {
    if (req.user.role.toLowerCase() === 'admin') {
      throw new UnauthorizedException();
    }
    const user_id = req.user._id;
    return this.cartService.findOne(user_id);
  }

  //  @docs   Can Only User update cartItems
  //  @Route  PATCH /api/v1/cart/:productId
  //  @access Private [User]
  @Patch(':productId')
  @Roles(['user'])
  @UseGuards(AuthGuard)
  update(
    @Param('productId') productId: string,
    @Body(new ValidationPipe({ forbidNonWhitelisted: true, whitelist: true }))
    updateCartItemsDto: UpdateCartItemsDto,
    @Req() req,
  ) {
    if (req.user.role.toLowerCase() === 'admin') {
      throw new UnauthorizedException();
    }
    const user_id = req.user._id;
    return this.cartService.update(productId, user_id, updateCartItemsDto);
  }

  //  @docs   Can Only User delete cartItems
  //  @Route  DELETE /api/v1/cart/:productId
  //  @access Private [User]
  @Delete(':productId')
  @Roles(['user'])
  @UseGuards(AuthGuard)
  remove(@Param('productId') productId: string, @Req() req) {
    if (req.user.role.toLowerCase() === 'admin') {
      throw new UnauthorizedException();
    }
    const user_id = req.user._id;
    return this.cartService.remove(productId, user_id);
  }

  // ======== For Admin ========== \\

  //  @docs   Can Admin Get Any Cart of user
  //  @Route  GET /api/v1/cart/admin/:userId
  //  @access Private [Admin]
  @Get('/admin/:userId')
  @Roles(['admin'])
  @UseGuards(AuthGuard)
  findOneForAdmin(@Param('userId') userId: string) {
    return this.cartService.findOneForAdmin(userId);
  }
  //  @docs   Can Admin Get All Carts
  //  @Route  GET /api/v1/cart/admin
  //  @access Private [Admin]
  @Get('/admin')
  @Roles(['admin'])
  @UseGuards(AuthGuard)
  findAllForAdmin() {
    return this.cartService.findAllForAdmin();
  }
}