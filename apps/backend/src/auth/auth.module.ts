import { Module } from '@nestjs/common';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { NaverAuthGuard } from './guards/naver-auth.guard';
import { NaverStrategy } from './strategies/naver.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MemberModule } from '../member/member.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    }),
    MemberModule,
  ],
  controllers: [AuthController],
  providers: [
    JwtStrategy,
    JwtAuthGuard,
    NaverStrategy,
    NaverAuthGuard,
    AuthService,
  ],
  exports: [JwtAuthGuard, NaverAuthGuard],
})
export class AuthModule {}
