/*
 * @Author: Lee
 * @Date: 2022-05-09 09:44:07
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-11 11:50:08
 * @Description:
 */

import * as crypto from 'crypto';

// -- 获取盐
export function getSalt() {
  return crypto.randomBytes(16).toString('base64');
}

// -- 加密
export function encript(password: string, salt: string) {
  return crypto.pbkdf2Sync(password, salt, 10000, 16, 'sha256').toString('base64');
}
