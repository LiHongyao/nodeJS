/*
 * @Author: Lee
 * @Date: 2022-04-29 22:11:45
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-10 16:10:41
 * @Description: 全局异常捕获过滤器
 */
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { IResponse } from '../interfaces/response.interface';

const logger = new Logger('http-exception.filter');

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  // -- exception：当前正在处理的异常对象
  // -- host：传递给原始处理程序的参数的一个包装（Request/Response）的引用
  catch(exception: HttpException, host: ArgumentsHost) {
    logger.log('进入全局异常捕获 >>>');
    const ctx = host.switchToHttp(); /** 获取请求上下文 */
    const request = ctx.getRequest<Request>(); /** 获取请求上下文中的request对象 */
    const response = ctx.getResponse<Response>(); /** 获取请求上下文中的response对象 */
    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR; /** 获取异常状态码 */
    const message = exception.message ? exception.message : `${status >= 500 ? '服务器错误（Service Error）' : '客户端错误（Client Error）'}`;

    // -- 抛出错误信息
    // -- 和全局响应拦截结构保持一致
    const errorResponse: IResponse = {
      code: status,
      data: null,
      msg: message,
    };
    response.status(status).json(errorResponse);
  }
}
