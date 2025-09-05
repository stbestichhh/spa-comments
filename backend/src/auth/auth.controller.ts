import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserBodyDto } from '../users/dto/create-user-body.dto';
import { LoginBodyDto } from './dto/login-body.dto';
import { User } from '../shared/decorators/user.decorator';
import { JwtGuard } from '../shared/guards/jwt.guard';
import { toUserDto } from '../shared/dto/user.dto';
import { UserModel } from '../database/models/user.model';
import { randomUUID } from 'crypto';
import { CaptchaService } from './captcha.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly captchaService: CaptchaService,
  ) {}

  @Post('signup')
  public async register(@Body() dto: CreateUserBodyDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  public async login(@Body() { password, email }: LoginBodyDto) {
    return this.authService.login(email, password);
  }

  @UseGuards(JwtGuard)
  @Get('me')
  public async getCurrentUser(@User() user: UserModel) {
    return Promise.resolve(toUserDto(user));
  }

  @Get('captcha')
  public getCaptcha() {
    const sessionId = randomUUID();
    const svg = this.captchaService.generate(sessionId.toString());

    return {
      sessionId,
      svg,
    };
  }
}
