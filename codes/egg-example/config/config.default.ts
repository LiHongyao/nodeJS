/*
 * @Author: Lee
 * @Date: 2022-04-19 16:00:30
 * @LastEditors: Lee
 * @LastEditTime: 2022-04-21 18:32:23
 */
import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1650355216889_3315';

  // add your egg config in here
  config.middleware = [];

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  // jwt
  config.jwt = {
    secret: 'secret', // 秘钥
  };
  // mongoose

  config.mongoose = {
    client: {
      // url: 'mongodb://root:123@localhost:27017',
      url: 'mongodb://localhost:27017',
      options: {
        dbName: 'TEST_PRO',
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    },
  };
  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
