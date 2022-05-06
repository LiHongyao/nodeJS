/*
 * @Author: Lee
 * @Date: 2022-05-01 22:20:57
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-06 14:07:53
 */
import { Request, Response, NextFunction } from 'express';

export function logger(req: Request, res: Response, next: NextFunction) {
  console.log('进入全局中间件 >>>');
  const { method, path, ip } = req;
  console.log(`${ip} ${method} ${path}`);
  next();
}
