/*
 * @Author: Lee
 * @Date: 2022-05-06 19:39:37
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-07 10:58:04
 * @Description:
 */
/*
 * @Author: Lee
 * @Date: 2022-04-29 21:42:45
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-05 16:47:36
 */
import { Module } from '@nestjs/common';
import { DbModule } from './common/db/db.module';
import * as Modules from './modules';

@Module({
  imports: [...Object.values(Modules), DbModule],
  controllers: [],
})
export class AppModule {}
