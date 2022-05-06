/*
 * @Author: Lee
 * @Date: 2022-05-06 23:34:43
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-06 23:36:36
 * @Description:
 */
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
