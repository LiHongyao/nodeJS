/*
 * @Author: Lee
 * @Date: 2022-05-10 10:07:36
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-10 10:09:07
 * @Description: 公共接口
 */
import { SetMetadata } from '@nestjs/common';

export const Public = () => SetMetadata('isPublic', true);
