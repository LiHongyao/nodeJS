/*
 * @Author: Lee
 * @Date: 2022-05-05 16:25:22
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-08 12:47:54
 * @Description:
 */
import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from 'src/common/dto/req/create-user.dto';
import { IResponse } from 'src/common/interfaces/response.interface';

const logger = new Logger('hello.service');

@Injectable()
export class HelloService {
  private response: IResponse;

  async fetch(id: string) {
    this.response = {
      code: 0,
      data: `查询ID：${id}`,
    };
    return this.response;
  }

  async save(data: CreateUserDto) {
    this.response = {
      code: 0,
      data,
    };
    return this.response;
  }

  async update(id: string, data: CreateUserDto) {
    logger.log('更新数据：', id, data);
    this.response = {
      code: 0,
    };
    return this.response;
  }

  async remove(id: number) {
    logger.log(`删除数据：${id}`);
    this.response = {
      code: 0,
    };
    return this.response;
  }
}
