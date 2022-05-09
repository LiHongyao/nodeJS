/*
 * @Author: Lee
 * @Date: 2022-05-05 16:25:22
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-09 22:45:08
 * @Description:
 */
import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from 'src/common/dto/req/create-user.dto';
import { IResponse } from 'src/common/interfaces/response.interface';
import { ConfigService } from '@nestjs/config';
const logger = new Logger('hello.service');

@Injectable()
export class HelloService {
  constructor(private configService: ConfigService /** 注入configService  */) {}

  async fetch(id: string): Promise<IResponse> {
    return { code: 0, data: `查询ID：${id}` };
  }

  async save(data: CreateUserDto): Promise<IResponse> {
    return { code: 0, data };
  }

  async update(id: string, data: CreateUserDto): Promise<IResponse> {
    logger.log('更新数据：', id, data);
    return { code: 0 };
  }

  async remove(id: number): Promise<IResponse> {
    logger.log(`删除数据：${id}`);
    return { code: 0, msg: '删除成功' };
  }

  async testEnv(): Promise<IResponse> {
    return { code: 0, data: this.configService.get('s_name') || '123' };
  }
}
