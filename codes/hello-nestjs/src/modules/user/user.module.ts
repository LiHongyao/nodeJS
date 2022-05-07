/*
 * @Author: Lee
 * @Date: 2022-05-06 23:34:43
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-07 13:37:13
 * @Description:
 */
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MiddlewareConsumer } from '@nestjs/common/interfaces';
import { HashPasswordMiddleware } from 'src/common/middleware/hash-password.middleware';

@Module({
  imports: [],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HashPasswordMiddleware).forRoutes('user/regist');
  }
}
