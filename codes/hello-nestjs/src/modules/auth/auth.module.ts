/*
 * @Author: Lee
 * @Date: 2022-05-03 11:02:08
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-06 18:16:26
 * @Description:
 */
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.servce';
import { JwtModule } from '@nestjs/jwt';
import { JWT_CONSTANT } from './jwt.constant';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    // -- 引入jwt模块
    JwtModule.register({
      secret: JWT_CONSTANT.secret,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy /** 引入jwt策略 */],
})
export class AuthModule {}
