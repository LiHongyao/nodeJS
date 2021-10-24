/*
 * @Author: Lee
 * @Date: 2021-10-24 21:40:25
 * @LastEditors: Lee
 * @LastEditTime: 2021-10-24 21:49:16
 */

// app/middleware/logmid.js
// options === app.config.logmid
module.exports = (options, app) => {
  return async (ctx, next) => {
    const host = ctx.get('host');
    console.log(`${options.desc}：用户 ${host} 访问服务器~`);
    await next();
  };
};
