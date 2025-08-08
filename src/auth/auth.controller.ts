import { Body, Controller, Param, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import {  ResetPasswordDto, SignInDto, SignUpDto } from './dto/auth.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  //  @docs   Sign Up
  //  @Route  POST /api/v1/auth/sign-up
  //  @access Public
  @Post('sign-up')
  @ApiOperation({ summary: 'Sign Up' })
  @ApiResponse({ status: 201, description: 'User successfully registered.' })
  signUp(
    @Body(new ValidationPipe({ forbidNonWhitelisted: true }))
    signUpDto: SignUpDto,
  ) {
    return this.authService.signUp(signUpDto);
  }
  //  @docs   Sign In
  //  @Route  POST /api/v1/auth/sign-in
  //  @access Public
  @Post('sign-in')
  @ApiOperation({ summary: 'Sign In' })
  @ApiResponse({ status: 200, description: 'User successfully signed in.' })
  signIn(
    @Body(new ValidationPipe({ forbidNonWhitelisted: true }))
    signInDto: SignInDto,
  ) {
    return this.authService.signIn(signInDto);
  }
  //  @docs   Any User Can Reset Password
  //  @Route  POST /api/v1/auth/reset-password
  //  @access Public
  @Post('reset-password')
  @ApiOperation({ summary: 'Reset Password' })
  @ApiResponse({ status: 200, description: 'Password reset link sent to email.' })
  resetPassword(
    @Body(new ValidationPipe({ forbidNonWhitelisted: true }))
    email: ResetPasswordDto,
  ) {
    return this.authService.resetPassword(email);
  }
  //  @docs   Any User Can Virify Code
  //  @Route  POST /api/v1/auth/virify-code
  //  @access Public
  @Post('virify-code')
  @ApiOperation({ summary: 'Verify Code' })
  @ApiResponse({ status: 200, description: 'Code verified successfully.' })
  virifyCode(
    @Body(new ValidationPipe({ forbidNonWhitelisted: true }))
    virifyCode: {
      email: string;
      code: string;
    },
  ) {
    return this.authService.virifyCode(virifyCode);
  }

  //  @docs   Any User Can change password
  //  @Route  POST /api/v1/auth/change-password
  //  @access Private for users=> admin, user
  @Post('change-password')
  @ApiOperation({ summary: 'Change Password' })
  @ApiResponse({ status: 200, description: 'Password changed successfully.' })
  changePassword(
    @Body(new ValidationPipe({ forbidNonWhitelisted: true }))
    changePasswordData: SignInDto,
  ) {
    return this.authService.changePassword(changePasswordData);
  }

  //  @docs   Any User Can loged can refresh token
  //  @Route  POST /api/v1/auth/refresh-token/:refresh_token
  //  @access Private for users=> admin, user (loged)
  @Post('refresh-token/:refresh_token')
  @ApiOperation({ summary: 'Refresh Token' })
  @ApiResponse({ status: 200, description: 'Token refreshed successfully.' })
  refreshToken(@Param('refresh_token') refresh_token: string) {
    return this.authService.refreshToken(refresh_token);
  }
}