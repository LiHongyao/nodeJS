/*
 * @Author: Lee
 * @Date: 2022-05-05 16:25:22
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-06 13:48:20
 * @Description:
 */
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class HelloService {
  fetch(id: string) {
    return `查询信息：ID/${id}`;
  }

  save(data: CreateUserDto) {
    return data;
  }

  update(id: string, data: CreateUserDto) {
    console.log(data);
    return `更新数据ID:${id},${JSON.stringify(data)}`;
  }

  remove(id: string) {
    return `删除数据ID：${id}`;
  }
}
