/*
 * @Author: Lee
 * @Date: 2022-05-02 08:43:55
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-04 10:44:20
 * @Description:
 */
import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}
