/*
 * @Author: Lee
 * @Date: 2022-05-07 09:05:40
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-07 10:45:30
 * @Description:
 */
import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';

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
