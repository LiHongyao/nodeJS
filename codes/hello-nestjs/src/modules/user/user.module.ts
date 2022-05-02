/*
 * @Author: Lee
 * @Date: 2022-05-02 08:44:16
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-02 08:49:56
 */
/*
 * @Author: Lee
 * @Date: 2022-05-02 08:44:16
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-02 08:44:43
 */
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
