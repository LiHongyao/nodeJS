/*
 * @Author: Lee
 * @Date: 2022-05-09 14:54:21
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-09 16:16:52
 * @Description:
 */
import type { Objectype, Config } from './config.interface';

const util = {
  // -- 校验是否为对象
  isObject<T>(value: T): value is T & Objectype {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
  },
  // -- 执行合并
  merge<T extends Objectype, U extends Objectype>(target: T, source: U): T & U {
    for (const key of Object.keys(source)) {
      const targetValue = target[key];
      const sourceValue = source[key];
      if (this.isObject(targetValue) && this.isObject(sourceValue)) {
        Object.assign(sourceValue, this.merge(targetValue, sourceValue));
      }
    }
    return { ...target, ...source };
  },
};

export const configuration = async (): Promise<Config> => {
  // -- 导入默认配置
  const { config } = await import('./envs/default');
  // -- 根据当前环境（process.env.NODE_ENV）加载对应的配置文件，默认为 development 环境
  const { config: environment } = <{ config: Config }>await import(`./envs/${process.env.NODE_ENV || 'development'}`);
  // -- 执行合并，并导出
  const mergeResults = util.merge(config, environment);
  return mergeResults;
};
