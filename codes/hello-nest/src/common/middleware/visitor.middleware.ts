/*
 * @Author: Lee
 * @Date: 2022-05-01 22:20:57
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-10 15:51:25
 */
import { Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import requestIp from 'request-ip';

const logger = new Logger('logger.middleware');
export function visitor(req: Request, res: Response, next: NextFunction) {
  const { method, path, ip } = req;
  logger.log(`访问者信息：${ip} ${method} ${path}`);
  next();
}
