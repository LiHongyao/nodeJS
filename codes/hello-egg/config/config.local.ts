/*
 * @Author: Lee
 * @Date: 2022-04-19 16:00:30
 * @LastEditors: Lee
 * @LastEditTime: 2022-04-19 16:31:23
 */
import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {
    security: {
      csrf: {
        enable: false,
        ignoreJSON: true,
      },
    },
  };
  return config;
};
