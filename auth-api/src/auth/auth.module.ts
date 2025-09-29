import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GoogleStrategy } from './strategies/google.strategy';
import { GoogleController } from './google.controller';

  @Module({
    imports: [
      UsersModule,
      PassportModule,
      JwtModule.registerAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: '60s' },
        }),
        inject: [ConfigService],
      }),
      ConfigModule.forRoot({ isGlobal: true }),
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy, GoogleStrategy, ConfigService],
    controllers: [AuthController, GoogleController],
    exports: [AuthService],
  })
  export class AuthModule {}