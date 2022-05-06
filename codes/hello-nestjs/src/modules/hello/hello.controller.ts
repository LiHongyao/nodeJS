/*
 * @Author: Lee
 * @Date: 2022-05-01 12:29:52
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-06 13:47:42
 */
import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { HelloService } from './hello.service';

@Controller('hello')
export class HelloController {
  constructor(private readonly helloService: HelloService) {}
  // -- 查询
  @Get('info')
  fetch(@Query() { id }, @Headers('token') token) {
    console.log(`头部参数 token：${token}`);
    return this.helloService.fetch(id);
  }

  // -- 新建
  @Post('create')
  save(@Body() data: CreateUserDto) {
    return this.helloService.save(data);
  }

  // -- 更新

  @Patch('update/:id')
  update(@Param('id', new ParseIntPipe()) id, @Body() data: CreateUserDto) {
    return this.helloService.update(id, data);
  }

  // -- 删除
  @Delete('remove')
  remove(@Query() { id }) {
    return this.helloService.remove(id);
  }
}
