/*
 * @Author: Lee
 * @Date: 2022-05-03 11:02:03
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-06 14:19:31
 * @Description: 控制器
 */

import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.servce';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  async login(@Body() data: LoginDto) {
    return this.authService.login(data);
  }
}
