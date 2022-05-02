/*
 * @Author: Lee
 * @Date: 2022-05-02 08:44:25
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-02 09:00:16
 */
import { Injectable } from '@nestjs/common';
import { UserLoginDto } from './dto/user-login.dto';

@Injectable()
export class UserService {
  login(userLoginDto: UserLoginDto) {
    const { username, password } = userLoginDto;
    if (username === 'admin' && password === '1234') {
      return userLoginDto;
    } else {
      return {
        code: 401,
        data: null,
        msg: '账号或密码错误',
      };
    }
  }
}
