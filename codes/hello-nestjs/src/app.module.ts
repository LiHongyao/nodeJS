/*
 * @Author: Lee
 * @Date: 2022-05-06 19:39:37
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-06 23:34:24
 * @Description:
 */
/*
 * @Author: Lee
 * @Date: 2022-04-29 21:42:45
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-05 16:47:36
 */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DbModule } from './db/db.module';
import { UserModule } from './modules/user/user.module';
import * as Modules from './modules';

@Module({
  imports: [
    // -- 功能模块
    ...Object.values(Modules),
    // -- mongodb
    MongooseModule.forRoot('mongodb://lee:123@127.0.0.1:27017/DB-TEST'),
    DbModule,
    UserModule,
  ],
  controllers: [],
})
export class AppModule {}
