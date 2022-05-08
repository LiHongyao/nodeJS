/*
 * @Author: Lee
 * @Date: 2022-05-07 09:54:41
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-08 15:47:40
 * @Description:
 */
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: '姓名', example: '李鸿耀' })
  name: string;
  @ApiProperty({ description: '手机号', example: '17398888669' })
  phone: string;
  @ApiProperty({ description: '密码', example: '123456' })
  password: string;
  @ApiProperty({ description: '年龄', example: 28 })
  age: number;
  @ApiProperty({ description: '性别', example: 0 })
  sex: number;
  @ApiProperty({ description: '工作', example: '前端工程师' })
  job: string;
  salt?: string;
}
