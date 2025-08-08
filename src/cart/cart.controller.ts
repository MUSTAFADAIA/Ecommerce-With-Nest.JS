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
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
@ApiTags('Cart')

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}
  // ======== For User ========== \\

  //  @docs   Can Only User Logged Create Cart and add products in cart
  //  @Route  POST /api/v1/cart/:productId
  //  @access Private [User]
  @Post(':productId')
  @ApiOperation({ summary: 'Create a cart and add product to it' })
  @ApiResponse({ status: 201, description: 'Cart created successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
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
  @ApiOperation({ summary: 'Apply a coupon to the cart' })
  @ApiResponse({ status: 200, description: 'Coupon applied successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
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
  @ApiOperation({ summary: 'Get the cart for the user' })
  @ApiResponse({ status: 200, description: 'Cart retrieved successfully' })
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
  @ApiOperation({ summary: 'Update the quantity or color of an item in the cart' })
  @ApiResponse({ status: 200, description: 'Cart item updated successfully' })
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
  @ApiOperation({ summary: 'Remove an item from the cart' })
  @ApiResponse({ status: 200, description: 'Cart item removed successfully' })
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
  @ApiOperation({ summary: 'Get a specific user\'s cart for admin' })
  @ApiResponse({ status: 200, description: 'User cart retrieved successfully' })
  @Roles(['admin'])
  @UseGuards(AuthGuard)
  findOneForAdmin(@Param('userId') userId: string) {
    return this.cartService.findOneForAdmin(userId);
  }
  //  @docs   Can Admin Get All Carts
  //  @Route  GET /api/v1/cart/admin
  //  @access Private [Admin]
  @Get('/admin')
  @ApiOperation({ summary: 'Get all carts for admin' })
  @ApiResponse({ status: 200, description: 'All carts retrieved successfully' })
  @Roles(['admin'])
  @UseGuards(AuthGuard)
  findAllForAdmin() {
    return this.cartService.findAllForAdmin();
  }
}