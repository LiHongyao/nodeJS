/*
 * @Author: Lee
 * @Date: 2021-10-22 21:27:52
 * @LastEditors: Lee
 * @LastEditTime: 2021-10-22 21:55:40
 */

module.exports = (app) => {
  const config = (exports = {});
  // 配置Cookie安全字符串
  config.keys = app.name + "_1628828777491_2977";
  // 静态资源前缀
  config.static = { prefix: "/" };
  return {
    ...config,
  };
};
