
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Response as Res } from 'express';
import {
  Controller,
  Post,
  UseGuards,
  Request,
  Response,
  Body,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    const res = await this.authService.login(req.user);
    req.res.setHeader('Set-Cookie', [res.refresh_tokenCookie.cookie]);
    req.res.setHeader('Authorization', res.access_tokenCookie.access_token);
    return res.user;
  }

  @UseGuards(JwtRefreshAuthGuard)
  @Post('get-access-token')
  async getNewAccessToken(@Request() req) {
    const refreshToken = req.headers.authorization.replace('Bearer', '').trim();
    const response = await this.authService.getNewAccessToken(refreshToken);
    req.res.setHeader('Authorization', response.newAccessToken.access_token);
    return response.user;
  }
}
