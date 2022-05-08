/*
 * @Author: Lee
 * @Date: 2022-05-07 09:05:40
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-08 23:52:55
 * @Description:
 */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/common/db/schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel('USER_MODEL') private readonly userModel: Model<User>) {}

  // -- 通过手机号查找用户
  async findOneByPhone(phone: string) {
    return await this.userModel.find({ phone });
  }

  hello() {
    return { code: 0, data: 'Hello, nest.js!' };
  }
}
