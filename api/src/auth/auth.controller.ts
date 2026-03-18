import { Controller, Post, Body, Res, Req, UnauthorizedException, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import type { Response,Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Public } from './public.decorator';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService,private usersService: UsersService, private jwtService: JwtService,private configService: ConfigService) {}

  @Post('register')
  @Public()
  register(@Body() dto: RegisterDto) {
    // keep registration minimal: only name, email, password
    return this.authService.register(dto.email, dto.password, dto.name);
  }

  @Post('login')
  @Public()
async login(
  @Body() dto: LoginDto,
  @Res({ passthrough: true }) res: Response,
) {
  const tokens = await this.authService.login(dto.email, dto.password);

  res.cookie('refreshToken', tokens.refreshToken, {
    httpOnly: true,
    secure: false, // true ف production مع https
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return {
    accessToken: tokens.accessToken,
  };
}

  @Post('refresh')
  @Public()
async refresh(
  @Req() req: Request,
  @Res({ passthrough: true }) res: Response,
) {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    throw new UnauthorizedException('No refresh token');
  }

  try {
    const tokens = await this.authService.refreshFromToken(refreshToken);

    // set new refresh cookie
    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/',
    });

    return {
      accessToken: tokens.accessToken,
    };
  } catch (err) {
    // Refresh failed (invalid/expired refresh token) -> clear cookie so browser removes it
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      path: '/',
    });
    throw new UnauthorizedException('Invalid refresh token');
  }
}

@Public()
@Post('logout')
async logout(
  @Req() req: Request,
  @Res({ passthrough: true }) res: Response,
) {
  const refreshToken = req.cookies?.refreshToken;

  if (refreshToken) {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      });

      await this.usersService.updateRefreshToken(payload.sub, null);
    } catch (err) {
      // If the refresh token is invalid or verification fails, still proceed to clear the cookie
      // so the client session is removed. Do not rethrow here; clearing the cookie below is sufficient.
      // Log optionally for debugging.
      // console.debug('Invalid refresh token during logout', err?.message || err);
    }
  }

  // Clear the refresh token cookie using the same attributes as when it was set so browsers remove it reliably
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
    path: '/',
  });

  return { message: 'Logged out successfully' };
}

@Get('profile')
@UseGuards(JwtAuthGuard)
getProfile(@Req() req) {
  return req.user;
}
}