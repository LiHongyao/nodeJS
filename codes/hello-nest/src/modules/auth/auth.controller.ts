/*
 * @Author: Lee
 * @Date: 2022-05-03 11:02:03
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-08 15:38:11
 * @Description: 控制器
 */

import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/common/dto/req/create-user.dto';
import { LoginDto } from 'src/common/dto/req/login.dto';
import { AuthService } from './auth.servce';

@ApiTags('用户验证模块')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '用户登录' })
  @Post('login')
  async login(@Body() user: LoginDto) {
    return await this.authService.login(user);
  }

  @ApiOperation({ summary: '用户注册' })
  @Post('regist')
  async registUser(@Body() userDto: CreateUserDto) {
    return await this.authService.regist(userDto);
  }
}
