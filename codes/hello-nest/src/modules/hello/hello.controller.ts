/*
 * @Author: Lee
 * @Date: 2022-05-01 12:29:52
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-08 12:49:04
 */
import { Body, Controller, Delete, Get, Headers, Logger, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/common/dto/req/create-user.dto';
import { HelloService } from './hello.service';

const logger = new Logger('hello.controller');

@ApiTags('基础示例')
@Controller('hello')
export class HelloController {
  constructor(private readonly helloService: HelloService) {}
  // -- 查询
  @ApiOperation({ summary: '查询数据' })
  @ApiQuery({ name: 'id', description: '数据ID', type: Number, example: 1, required: false })
  @Get('info')
  fetch(@Query() { id }, @Headers('token') token) {
    logger.log(`头部参数 token：${token}`);
    return this.helloService.fetch(id);
  }

  // -- 新建
  @ApiOperation({ summary: '新增数据' })
  @Post('create')
  save(@Body() data: CreateUserDto) {
    return this.helloService.save(data);
  }

  // -- 更新
  @ApiOperation({ summary: '更新数据' })
  @ApiQuery({ name: 'id', description: '数据ID', type: Number, example: 1, required: false })
  @Patch('update/:id')
  update(@Param('id', new ParseIntPipe()) id, @Body() data: CreateUserDto) {
    return this.helloService.update(id, data);
  }

  // -- 删除
  @ApiOperation({ summary: '删除数据' })
  @ApiQuery({ name: 'id', description: '数据ID', type: Number, example: 1, required: false })
  @Delete('remove')
  remove(@Query('id', new ParseIntPipe()) id) {
    return this.helloService.remove(id);
  }
}
