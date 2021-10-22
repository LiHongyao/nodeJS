/*
 * @Author: Lee
 * @Date: 2021-08-16 11:56:12
 * @LastEditors: Lee
 * @LastEditTime: 2021-08-16 11:56:30
 */
module.exports = (appInfo) => {
  const config = (exports = {});

  // 传入logmid中间件的options参数
  config.logmid = {
    desc: "日志信息（开发环境）：",
  };

  return {
    ...config,
  };
};