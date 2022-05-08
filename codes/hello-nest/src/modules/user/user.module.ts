/*
 * @Author: Lee
 * @Date: 2022-05-06 23:34:43
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-08 15:02:01
 * @Description:
 */
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
