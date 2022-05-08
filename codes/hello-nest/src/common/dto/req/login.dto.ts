/*
 * @Author: Lee
 * @Date: 2022-05-08 15:36:23
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-08 15:37:25
 * @Description:
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({ description: '手机号', example: '17398888669' })
  @IsNotEmpty({ message: '手机号不能为空' })
  phone: string;

  @ApiProperty({ description: '密码', example: '123456' })
  @IsNotEmpty({ message: '密码不能为空' })
  password: string;
}
