import { Controller, Post, Body, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const user = await this.authService.register(registerDto);
    return { message: 'User registered successfully', user };
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const response = await this.authService.login(loginDto);
    res.cookie('auth_token', response.accessToken, {
      httpOnly: true,
      secure: true, // Ensure cookies are sent over HTTPS
      maxAge: 300, // Cookie expiration set to 1 hour
    });
    return res.status(200).json({
      message: 'Logged in successfully',
      success: true,
      token: response.accessToken,
    });
  }

  // Inside a controller method
  @Post('logout')
  async logout(@Res() res: Response) {
    res.clearCookie('auth_token', { httpOnly: true, secure: true });
    return res.status(200).json({
      message: 'Logged out successfully',
      success: true,
    });
  }

}
