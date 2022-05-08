/*
 * @Author: Lee
 * @Date: 2022-05-07 11:38:30
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-08 14:56:46
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
