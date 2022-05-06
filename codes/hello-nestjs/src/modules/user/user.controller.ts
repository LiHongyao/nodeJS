/*
 * @Author: Lee
 * @Date: 2022-05-06 23:36:09
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-06 23:37:28
 * @Description:
 */
import { Controller } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/db/schemas/user.schema';

@Controller('user')
export class UserController {
  constructor(@InjectModel('USER_MODULE') private readonly userModel: Model<User>) {}
}
