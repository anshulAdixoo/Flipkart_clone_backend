/* eslint-disable @typescript-eslint/no-unused-vars */
// auth/auth.controller.ts
import { Controller, Post, Body, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const user = await this.authService.register(registerDto);
    return { message: 'User registered successfully', user };
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto,@Res() res: Response) {
    const response=await this.authService.login(loginDto);
    console.log(response);
    res.cookie('auth_token', response.accessToken, {
      httpOnly: true,  // Ensure the cookie is not accessible via JavaScript
      secure: true,  // Use secure cookies in production (HTTPS)
      maxAge: 3600000,  // Set cookie expiry to 1 hour (or adjust as needed)
    });
    return res.status(200).json({
      message:"logged in",
      success:true,
      token:response.accessToken
    })
  }
  @Post('logout')
  async logout(@Req() req) {
    return { message: 'You have been logged out successfully' };
  }
}
