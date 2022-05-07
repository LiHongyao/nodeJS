/*
 * @Author: Lee
 * @Date: 2022-05-02 10:29:20
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-07 14:22:35
 * @Description: 全局响应拦截
 */
import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const logger = new Logger('response.interceptor');
// -- 返回体结构
interface Response<T> {
  data: T;
}
@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<Response<T>> {
    logger.log('进入响应拦截器 >>>');
    // 实现数据的遍历与转变
    return next.handle().pipe(
      map((data) => {
        logger.log(data);
        return {
          status: 200,
          data,
          message: 'success',
        };
      }),
    );
  }
}
