/*
 * @Author: Lee
 * @Date: 2022-05-06 19:39:37
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-09 15:10:36
 * @Description:
 */
/*
 * @Author: Lee
 * @Date: 2022-04-29 21:42:45
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-05 16:47:36
 */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './common/db/db.module';
import * as Modules from './modules';
import { configuration } from './configs';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    ...Object.values(Modules),
    DbModule,
  ],
  controllers: [],
})
export class AppModule {}
