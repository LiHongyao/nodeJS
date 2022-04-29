/*
 * @Author: Lee
 * @Date: 2022-04-29 17:41:25
 * @LastEditors: Lee
 * @LastEditTime: 2022-04-29 18:01:58
 */

import { LoginParams } from '../interfaces/user.interface';
export class LoginDto implements LoginParams {
  code: string;
}
