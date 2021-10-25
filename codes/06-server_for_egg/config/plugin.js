/*
 * @Author: Lee
 * @Date: 2021-10-24 11:46:02
 * @LastEditors: Lee
 * @LastEditTime: 2021-10-25 11:13:47
 */
module.exports = {
  // - 路由分组
  routerPlus: {
    enable: true,
    package: 'egg-router-plus',
  },
  // - 跨域
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  // - mogodb
  mongoose: {
    enable: true,
    package: 'egg-mongoose',
  },
  // - egg-swagger-doc
  swaggerdoc: {
    enable: true,
    package: 'egg-swagger-doc',
  },
};
