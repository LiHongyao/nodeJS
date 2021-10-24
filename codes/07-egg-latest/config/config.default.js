/*
 * @Author: Lee
 * @Date: 2021-10-24 11:45:56
 * @LastEditors: Lee
 * @LastEditTime: 2021-10-24 22:03:07
 */

module.exports = (app) => {
  // # 【系统配置】
  const config = (exports = {});
  // - 配置cookie安全字符串
  config.keys = app.name + '_1634953317990_7396';
  // - 静态资源前缀
  config.static = { prefix: '/' };
  // - csrf
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: [],
  };
  // - 配置跨域
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };
  // - 中间件配置
  config.middleware = ['logmid'];
  config.logmid = {
    desc: '日志信息：',
  };
  // -- mongodb
  config.mongoose = {
    url: 'mongodb://127.0.0.1:27017',
    options: {
      user: 'lee',
      pass: '930716',
      dbName: '',
    },
  };
  // # 【用户配置】
  const userConfig = {};
  return {
    ...config,
    ...userConfig,
  };
};
