/*
 * @Author: Lee
 * @Date: 2022-04-19 16:00:30
 * @LastEditors: Lee
 * @LastEditTime: 2022-04-19 17:49:08
 */
import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  jwt: {
    enable: true,
    package: 'egg-jwt',
  },
};

export default plugin;
