import { Injectable } from '@nestjs/common';
import { CreateDto } from './dto/index.dto';

@Injectable()
export class HelloService {
  fetch(id: string) {
    return `fetch with ID：${id}`;
  }

  save(data: CreateDto) {
    return data;
  }
  update(id: string, message: string) {
    return `update message of id ${id}：${message}`;
  }
  remove(id: string) {
    return `remove message of id ${id}`;
  }
}
