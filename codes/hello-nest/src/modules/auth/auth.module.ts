/*
 * @Author: Lee
 * @Date: 2022-05-03 11:02:08
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-08 15:03:59
 * @Description:
 */
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.servce';
import { JwtModule } from '@nestjs/jwt';
import { JWT_CONSTANT } from './jwt.constant';
import { JwtStrategy } from './jwt.strategy';
import { UserService } from 'src/modules/user/user.service';
import { HashPasswordMiddleware } from 'src/common/middleware/hash-password.middleware';

@Module({
  imports: [
    // -- 引入jwt模块
    JwtModule.register({
      secret: JWT_CONSTANT.secret,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, JwtStrategy /** 引入jwt策略 */],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HashPasswordMiddleware).forRoutes('auth/regist');
  }
}
