/*
 * @Author: Lee
 * @Date: 2022-05-01 20:30:27
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-01 22:01:09
 */
import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateDto {
  @ApiProperty({
    name: 'name',
    description: '姓名',
    type: String,
  })
  @IsString()
  name: string;

  @ApiProperty({ name: 'age', description: 'age', type: Number })
  @IsNumber()
  age: number;
}

export class UpdateDto {
  @ApiProperty({
    name: 'message',
    description: '更新内容',
    type: String,
  })
  @IsString()
  message: string;
}
