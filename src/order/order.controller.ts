import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  ValidationPipe,
  Req,
  UnauthorizedException,
  NotFoundException,
  UseGuards,
  Query,
  RawBodyRequest,
  Headers,
  Get,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { AcceptOrderCashDto, CreateOrderDto } from './dto/create-order.dto';

import { Request } from 'express';
import { Roles } from 'src/user/decorator/roles.decorator';
import { AuthGuard } from 'src/user/guard/auth.guard';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Order')
@Controller('cart/checkout')
export class OrderCheckoutController {
  constructor(private readonly orderService: OrderService) {}

  //  @docs   User Can Create Order and Checkout session
  //  @Route  POST /api/v1/cart/checkout/:paymentMethodType?success_url=https://ecommerce-nestjs.com&cancel_url=https://ecommerce-nestjs.com
  //  @access Private [User]
  @Post(':paymentMethodType')
  @ApiOperation({ summary: 'Create an order and checkout session' })
  @ApiResponse({ status: 201, description: 'Order created successfully' })
  @Roles(['user'])
  @UseGuards(AuthGuard)
  create(
    @Param('paymentMethodType') paymentMethodType: 'card' | 'cash',
    @Body(new ValidationPipe({ forbidNonWhitelisted: true, whitelist: true }))
    createOrderDto: CreateOrderDto,
    @Req() req,
    @Query() query,
  ) {
    if (req.user.role.toLowerCase() === 'admin') {
      throw new UnauthorizedException();
    }
    if (!['card', 'cash'].includes(paymentMethodType)) {
      throw new NotFoundException('No payment method found');
    }
    const {
      success_url = 'https://ecommerce-nestjs.com',
      cancel_url = 'https://ecommerce-nestjs.com',
    } = query;

    const dataAfterPayment = {
      success_url,
      cancel_url,
    };

    const user_id = req.user._id;
    return this.orderService.create(
      user_id,
      paymentMethodType,
      createOrderDto,
      dataAfterPayment,
    );
  }

  //  @docs   Admin Can Update Order payment cash
  //  @Route  PATCH /api/v1/cart/checkout/:orderId/cash
  //  @access Private [User]
  @Patch(':orderId/cash')
  @ApiOperation({ summary: 'Update order payment status to cash' })
  @ApiResponse({
    status: 200,
    description: 'Order payment updated successfully',
  })
  @Roles(['admin'])
  @UseGuards(AuthGuard)
  updatePaidCash(
    @Param('orderId') orderId: string,
    @Body(new ValidationPipe({ forbidNonWhitelisted: true, whitelist: true }))
    updateOrderDto: AcceptOrderCashDto,
  ) {
    return this.orderService.updatePaidCash(orderId, updateOrderDto);
  }
}

@ApiTags('Checkout')
@Controller('checkout/session')
export class CheckoutCardController {
  constructor(private readonly orderService: OrderService) {}

  //  @docs   Webhook paid order true auto
  //  @Route  PATCH /api/v1/checkout/session
  //  @access Private [Stripe]
  @Post()
  @ApiOperation({ summary: 'Update order payment status from Stripe webhook' })
  @ApiResponse({
    status: 200,
    description: 'Order payment updated successfully',
  })
  updatePaidCard(
    @Headers('stripe-signature') sig,
    @Req() request: RawBodyRequest<Request>,
  ) {
    const endpointSecret =
      'whsec_db59966519a65529ae568ade70303bf419be37a47f3777c18a8a4f1c79c8a07a';

    const payload = request.rawBody;

    return this.orderService.updatePaidCard(payload, sig, endpointSecret);
  }
}

@ApiTags('Order')
@Controller('order/user')
export class OrderForUserController {
  constructor(private readonly orderService: OrderService) {}

  //  @docs   User Can get all order
  //  @Route  GET /api/v1/order/user
  //  @access Private [User]
  @Get()
  @ApiOperation({ summary: 'Get all orders for the user' })
  @ApiResponse({ status: 200, description: 'Orders retrieved successfully' })
  @Roles(['user'])
  @UseGuards(AuthGuard)
  findAllOrdersOnUser(@Req() req) {
    if (req.user.role.toLowerCase() === 'admin') {
      throw new UnauthorizedException();
    }
    const user_id = req.user._id;
    return this.orderService.findAllOrdersOnUser(user_id);
  }
}

@ApiTags('Order')
@Controller('order/admin')
export class OrderForAdminController {
  constructor(private readonly orderService: OrderService) {}

  //  @docs   Admin Can get all order
  //  @Route  GET /api/v1/order/admin
  //  @access Private [Admin]
  @Get()
  @ApiOperation({ summary: 'Get all orders for admin' })
  @ApiResponse({ status: 200, description: 'Orders retrieved successfully' })
  @Roles(['admin'])
  @UseGuards(AuthGuard)
  findAllOrders() {
    return this.orderService.findAllOrders();
  }
  //  @docs   Admin Can get all order
  //  @Route  GET /api/v1/order/admin/:userId
  //  @access Private [Admin]
  @Get(':userId')
  @ApiOperation({ summary: 'Get all orders for a specific user by ID' })
  @ApiResponse({ status: 200, description: 'Orders retrieved successfully' })
  @Roles(['admin'])
  @UseGuards(AuthGuard)
  findAllOrdersByUserId(@Param('userId') userId: string) {
    return this.orderService.findAllOrdersOnUser(userId);
  }
}

/*
stripe login
stripe listen --forward-to localhost:3000/api/v1/checkout/session
*/
