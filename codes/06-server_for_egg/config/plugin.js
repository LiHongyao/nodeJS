/*
 * @Author: Lee
 * @Date: 2021-08-16 10:30:21
 * @LastEditors: Lee
 * @LastEditTime: 2021-10-15 16:50:56
 */

// config/plugin.js
module.exports = {
  // 模板渲染
  nunjucks: {
    enable: true,
    package: "egg-view-nunjucks",
  },
  cors: {
    enable: true,
    package: "egg-cors",
  },
  mongoose: {
    enable: true,
    package: 'egg-mongoose'
  }
};
