/*
 * @Author: Lee
 * @Date: 2022-05-04 10:27:16
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-04 23:40:30
 * @Description:
 */

import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  age: number;

  @IsNumber()
  sex: number;

  @IsString()
  phone: string;
}
