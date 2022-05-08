/*
 * @Author: Lee
 * @Date: 2022-05-06 23:36:09
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-08 23:49:03
 * @Description:
 */
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';

@ApiTags('用户')
@ApiBearerAuth('jwt')
@Controller('user')
export class UserController {
  constructor(private readonly userServier: UserService) {}

  @ApiOperation({ summary: '测试守卫' })
  @Get('hello')
  // -- jwt 守卫
  @UseGuards(AuthGuard('jwt'))
  hello() {
    return this.userServier.hello();
  }
}
