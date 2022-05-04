/*
 * @Author: Lee
 * @Date: 2022-05-04 10:27:16
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-04 10:29:40
 * @Description:
 */

import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNumber()
  age: number;

  @IsNumber()
  sex: number;

  @IsString()
  phone: string;
}
