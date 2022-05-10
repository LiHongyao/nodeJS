/*
 * @Author: Lee
 * @Date: 2022-05-02 10:29:20
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-10 15:20:26
 * @Description: 全局响应拦截
 */
import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IResponse } from '../interfaces/response.interface';

const logger = new Logger('response.interceptor');

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<IResponse> {
    // 实现数据的遍历与转变
    return next.handle().pipe(
      map((response: IResponse) => {
        logger.log('进入响应拦截器 >>>');
        const { code, msg, data } = response;
        return {
          code,
          data: data || null,
          msg: msg || 'success',
        };
      }),
    );
  }
}
