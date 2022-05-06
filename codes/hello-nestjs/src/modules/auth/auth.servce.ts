/*
 * @Author: Lee
 * @Date: 2022-05-03 11:02:13
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-06 14:43:33
 * @Description:
 */
import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  async login(data: LoginDto) {
    if (true) {
      // -- 登录成功
      return data;
    }
    return null;
  }
}
