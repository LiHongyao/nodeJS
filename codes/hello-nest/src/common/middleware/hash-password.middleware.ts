/*
 * @Author: Lee
 * @Date: 2022-05-07 11:35:39
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-08 14:59:52
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
      // -- 存储盐值，验证登录时我们将客户端传递过来的密码用这个盐值加密并比对存储的加密密码用于判断是否登录成功
      req.body['salt'] = salt;
    }
    next();
  }
}
