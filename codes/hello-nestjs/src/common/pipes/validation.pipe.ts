/*
 * @Author: Lee
 * @Date: 2022-05-02 09:27:14
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-07 14:26:10
 * @Description: 全局dto验证
 */
import { ArgumentMetadata, BadRequestException, Injectable, Logger, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

const logger = new Logger('validation.pipe');

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  // -- value：当前处理参数
  // -- metatype：属性的元类型
  async transform(value: any, { metatype }: ArgumentMetadata) {
    logger.log('进入全局管道 >>>');
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    // -- plainToClass将普通的JavaScript对象转换为特定类的实例
    const object = plainToClass(metatype, value);
    // -- 验证该对象返回出错的数组
    const errors = await validate(object);
    if (errors.length > 0) {
      // -- 将错误信息数组中的第一个内容返回给异常过滤器
      const constraints = errors.shift().constraints;
      const k = Object.keys(constraints)[0];
      const errorMsg = constraints[k];
      throw new BadRequestException(errorMsg);
    }
    return value;
  }
  // eslint-disable-next-line @typescript-eslint/ban-types
  private toValidate(metatype: Function): boolean {
    // eslint-disable-next-line @typescript-eslint/ban-types
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
