import { Controller, Get, Request, Res, UseGuards } from '@nestjs/common';
import { NaverAuthGuard } from './guards/naver-auth.guard';
// import { AuthService } from './auth.service';
import { Response } from 'express';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(NaverAuthGuard)
  @Get('member/auth/naver')
  async naverLogin() {
    // 네이버 로그인 페이지로 리다이렉트
  }

  @UseGuards(NaverAuthGuard)
  @Get('login/oauth2/code/naver')
  async naverCallback(@Request() req, @Res() res: Response) {
    const result = await this.authService.validateOAuthUser(req.user);

    // HttpOnly 쿠키로 토큰 설정
    res.cookie('accessToken', result.accessToken, {
      httpOnly: true, // XSS 방지 (JavaScript로 접근 불가)
      secure: false, // 개발환경에서는 false (프로덕션에서는 true)
      sameSite: 'lax', // CSRF 방지
      maxAge: 24 * 60 * 60 * 1000, // 1일
      path: '/',
    });

    // 프론트엔드로 리다이렉트
    const redirectUrl = result.isNewUser
      ? `${process.env.FRONTEND_URL}/auth/signup-complete`
      : `${process.env.FRONTEND_URL}/dashboard`;

    res.redirect(redirectUrl);
  }
}
