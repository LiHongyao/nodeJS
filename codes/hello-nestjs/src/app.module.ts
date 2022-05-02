/*
 * @Author: Lee
 * @Date: 2022-04-29 21:42:45
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-02 08:45:22
 */
import { Module } from '@nestjs/common';
import { HelloModule } from './modules/hello/hello.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [HelloModule, UserModule],
  controllers: [],
})
export class AppModule {}
