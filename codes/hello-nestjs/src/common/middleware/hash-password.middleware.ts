/*
 * @Author: Lee
 * @Date: 2022-05-07 11:35:39
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-07 14:54:57
 * @Description:
 */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { encript, getSalt } from 'src/utils/encription';

@Injectable()
export class HashPasswordMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // -- 获取请求体中的密码
    const userPassword = req.body['password'];
    if (userPassword) {
      const salt = getSalt();
      // -- 将加密后的密码替换
      req.body['password'] = encript(userPassword, salt);
      // -- 存储盐值，用于登陆时解密
      req.body['salt'] = salt;
    }
    next();
  }
}
