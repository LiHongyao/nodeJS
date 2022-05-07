/*
 * @Author: Lee
 * @Date: 2022-05-07 09:54:41
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-07 16:44:27
 * @Description:
 */
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: '姓名' })
  name: string;
  @ApiProperty({ description: '手机号' })
  phone: string;
  @ApiProperty({ description: '密码' })
  password: string;
  @ApiProperty({ description: '年龄' })
  age: number;
  @ApiProperty({ description: '性别' })
  sex: number;
  @ApiProperty({ description: '工作' })
  job: string;
  salt?: string;
}
