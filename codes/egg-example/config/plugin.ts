/*
 * @Author: Lee
 * @Date: 2022-04-19 16:00:30
 * @LastEditors: Lee
 * @LastEditTime: 2022-04-21 14:10:42
 */
import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  jwt: {
    enable: true,
    package: 'egg-jwt',
  },
  mongoose: {
    enable: true,
    package: 'egg-mongoose',
  },
};

export default plugin;
