/*
 * @Author: Lee
 * @Date: 2022-05-01 22:20:57
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-02 23:11:12
 */
import { Request, Response, NextFunction } from 'express';

export function logger(req: Request, res: Response, next: NextFunction) {
  console.log('进入全局中间件 >>>');
  const { method, path } = req;
  console.log(`${method} ${path}`);
  next();
}
