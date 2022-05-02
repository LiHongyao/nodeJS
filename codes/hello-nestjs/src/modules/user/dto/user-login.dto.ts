/*
 * @Author: Lee
 * @Date: 2022-05-02 08:46:46
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-02 10:07:53
 */

import { ApiProperty } from '@nestjs/swagger';
import { MinLength, IsNotEmpty } from 'class-validator';
export class UserLoginDto {
  @ApiProperty({
    name: 'username',
    description: '用户名',
  })
  @IsNotEmpty({ message: '账号不能为空' })
  username: string;

  @ApiProperty({
    name: 'password',
    description: '密码',
  })
  @MinLength(4, { message: '密码长度不能小于4位数' })
  @IsNotEmpty({ message: '密码不能为空' })
  password: string;
}
