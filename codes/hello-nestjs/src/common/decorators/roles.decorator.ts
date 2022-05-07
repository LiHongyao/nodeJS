/*
 * @Author: Lee
 * @Date: 2022-05-07 16:01:46
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-07 16:02:15
 * @Description:
 */
import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
