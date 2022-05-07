/*
 * @Author: Lee
 * @Date: 2022-05-01 22:20:57
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-07 14:24:54
 */
import { Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
const logger = new Logger('logger.middleware');
export function visitor(req: Request, res: Response, next: NextFunction) {
  const { method, path, ip } = req;
  logger.log(`访问者信息：${ip} ${method} ${path}`);
  next();
}
