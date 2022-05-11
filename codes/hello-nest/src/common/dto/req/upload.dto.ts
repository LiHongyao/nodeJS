/*
 * @Author: Lee
 * @Date: 2022-05-11 16:05:12
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-11 16:13:08
 * @Description:
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UploadDto {
  @ApiProperty({ description: '存储路径', example: '/xxx/xxx.jpg' })
  @IsNotEmpty({ message: '请上传文件路径' })
  key: string;
}
