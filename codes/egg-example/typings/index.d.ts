/*
 * @Author: Lee
 * @Date: 2022-04-19 16:00:30
 * @LastEditors: Lee
 * @LastEditTime: 2022-04-19 18:14:24
 */
import 'egg';

declare module 'egg' {
  interface Application {
    jwt: any;
  }
}
