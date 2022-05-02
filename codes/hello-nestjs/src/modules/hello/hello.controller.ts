/*
 * @Author: Lee
 * @Date: 2022-05-01 12:29:52
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-02 10:25:49
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
import {
  ApiTags,
  ApiOperation,
  ApiQuery,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { CreateDto, UpdateDto } from './dto/index.dto';
import { HelloService } from './hello.service';

@ApiTags('基础示例')
@Controller('hello')
export class HelloController {
  constructor(
    /** 注入HelloService服务 */
    private readonly helloService: HelloService,
  ) {}
  // 查询
  @ApiOperation({ summary: '查询示例' })
  @ApiQuery({
    name: 'id',
    description: '查询索引',
    type: Number,
    example: 1,
    required: false,
  })
  @Get()
  fetch(@Query() { id }, @Headers('token') token) {
    console.log(token);
    return this.helloService.fetch(id);
  }

  // 创建
  @ApiOperation({ summary: '创建示例' })
  @Post()
  save(@Body() data: CreateDto) {
    return this.helloService.save(data);
  }

  // 更新
  @ApiOperation({ summary: '更新示例' })
  @ApiParam({ name: 'id', description: '更新索引', type: Number, example: 1 })
  @ApiBody({ type: UpdateDto })
  @Patch(':id')
  update(@Param('id', new ParseIntPipe()) id, @Body() { message }) {
    return this.helloService.update(id, message);
  }

  // 删除
  @ApiOperation({ summary: '删除示例' })
  @Delete()
  remove(@Query() { id }) {
    return this.helloService.remove(id);
  }
}
