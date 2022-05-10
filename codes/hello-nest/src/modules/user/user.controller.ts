/*
 * @Author: Lee
 * @Date: 2022-05-06 23:36:09
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-10 15:59:42
 * @Description:
 */
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { UserService } from './user.service';

@ApiTags('用户')
@ApiBearerAuth('jwt')
@Controller('user')
export class UserController {
  constructor(private readonly userServier: UserService) {}

  @ApiOperation({ summary: '测试守卫' })
  @Get('hello')
  hello(@Req() request: Request) {
    console.log(request.user);
    // -- 通过 request.user 可获取jwt用户信息
    return this.userServier.hello();
  }
}
