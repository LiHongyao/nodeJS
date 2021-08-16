/*
 * @Author: Lee
 * @Date: 2021-08-16 09:39:27
 * @LastEditors: Lee
 * @LastEditTime: 2021-08-16 14:45:10
 */

module.exports = (appInfo) => {
  const config = (exports = {});

  // 配置Cookie安全字符串
  config.keys = appInfo.name + "_1628828777491_2977";
  // 修改静态资源映射路径
  config.static = {
    prefix: "/",
  };
  // 模板文件配置
  config.view = {
    defaultViewEngine: "nunjucks",
    mapping: {
      ".tpl": "nunjucks",
    },
  };
  // 安全性配置
  config.security = {
    // 支持post
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: [],
  };

  // 中间件配置
  config.middleware = [
    "logmid", // 日志中间件
  ];
  // 传入logmid中间件的options参数
  config.logmid = {
    desc: "日志信息：",
    name: "Li-HONGYAO",
  };

  return {
    ...config,
  };
};