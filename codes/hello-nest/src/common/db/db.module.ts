/*
 * @Author: Lee
 * @Date: 2022-05-07 09:05:40
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-08 15:23:42
 * @Description:
 */
import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';

// -- 此模块使用 forFeature() 方法定义在当前范围中注册哪些存储库。
// -- 如果有多张表，直接在数组中加配置就可以了
const MONGO_MODELS = MongooseModule.forFeature([
  {
    name: 'USER_MODEL',
    schema: UserSchema,
  },
]);

@Global()
@Module({
  imports: [MongooseModule.forRoot('mongodb://lee:123@127.0.0.1:27017/DB-TEST'), MONGO_MODELS],
  exports: [MONGO_MODELS],
})
export class DbModule {}
