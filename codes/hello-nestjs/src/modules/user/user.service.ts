/*
 * @Author: Lee
 * @Date: 2022-05-02 08:44:25
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-05 17:00:17
 */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  // -- 注册Schema后，可以使用 @InjectModel() 装饰器将 User 模型注入到 UserService 中
  constructor(@InjectModel('User') private userTest: Model<UserDocument>) {}

  // -- 添加
  async create(createUserDto: CreateUserDto) {
    const createUser = new this.userTest(createUserDto);
    try {
      return await createUser.save();
    } catch (error) {
      console.log(error.message);
    }
  }
}
