/*
 * @Author: Lee
 * @Date: 2022-05-07 11:38:30
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-07 13:33:48
 * @Description:
 */

import * as crypto from 'crypto';

/**
 * 获取盐
 * @returns
 */
export function getSalt() {
  return crypto.randomBytes(16).toString('base64');
}

/**
 * 加密
 * @param password
 * @param salt
 * @returns
 */
export function encript(password: string, salt: string) {
  return crypto.pbkdf2Sync(password, salt, 10000, 16, 'sha256').toString('base64');
}
