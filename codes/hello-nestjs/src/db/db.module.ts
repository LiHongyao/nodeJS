import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';

const MONGO_MODULES = MongooseModule.forFeature([
  {
    name: 'USER_MODEL',
    schema: UserSchema,
    collection: 'user',
  },
]);

@Global()
@Module({
  imports: [MongooseModule.forRoot('mongodb://:123@127.0.0.1:27017/DB-TEST'), MONGO_MODULES],
  exports: [MONGO_MODULES],
})
export class DbModule {}
