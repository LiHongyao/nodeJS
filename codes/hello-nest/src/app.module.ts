/*
 * @Author: Lee
 * @Date: 2022-05-09 09:44:07
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-11 11:16:29
 * @Description:
 */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './common/db/db.module';
import * as Modules from './modules';
import { configuration } from './configs';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';

@Module({
  imports: [
    // -- 配置模块
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [configuration],
    }),
    // -- 数据库
    DbModule,
    // -- 业务模块
    ...Object.values(Modules),
  ],
  providers: [
    // Global Guard, Authentication check on all routers
    { provide: APP_GUARD, useClass: JwtAuthGuard },
  ],
  controllers: [],
})
export class AppModule {}
