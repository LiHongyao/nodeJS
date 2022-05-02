/*
 * @Author: Lee
 * @Date: 2022-04-29 22:11:45
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-02 23:31:26
 * @Description: 全局异常捕获过滤器
 */
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  // -- exception：当前正在处理的异常对象
  // -- host：传递给原始处理程序的参数的一个包装（Request/Response）的引用
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    // -- HttpException  属于基础异常类，可以自定义内容
    // -- 如果是自定义的异常类则抛出自定义的status
    // -- 否则就是内置HTPP异常类，然后抛出其内置的Status内容
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const exceptionRes: any = exception.getResponse();
    console.log(exceptionRes);
    // -- 抛出错误信息
    const message = exception.message;
    // -- 和全局响应拦截结构保持一致
    const msgLog = {
      status,
      data: null,
      message,
    };
    // -- 打印错误综合日志
    Logger.error('错误信息', JSON.stringify(msgLog), 'HttpExceptionFilter');
    response.status(status).json(msgLog);
  }
}
