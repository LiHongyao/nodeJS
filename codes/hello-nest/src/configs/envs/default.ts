/*
 * @Author: Lee
 * @Date: 2022-05-09 14:58:56
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-09 16:14:38
 * @Description:
 */

// -- 默认配置
export const config = {
  jwtSecret: process.env.JWT_SECRET || 'jwt_secret',
};
