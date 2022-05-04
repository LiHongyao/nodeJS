/*
 * @Author: Lee
 * @Date: 2022-05-03 11:02:08
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-03 11:07:25
 * @Description:
 */
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.servce';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
