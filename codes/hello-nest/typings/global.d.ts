/*
 * @Author: Lee
 * @Date: 2022-05-09 14:33:32
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-09 16:00:33
 * @Description:
 */
export declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_PORT: string;
      APP_PREFIX: string;
      JWT_SECRET: string;
    }
  }
}
