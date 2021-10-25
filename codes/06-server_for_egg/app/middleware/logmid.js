/*
 * @Author: Lee
 * @Date: 2021-10-24 21:40:25
 * @LastEditors: Lee
 * @LastEditTime: 2021-10-25 09:50:44
 */

// app/middleware/logmid.js
// options === app.config.logmid
module.exports = (options, app) => {
  return async (ctx, next) => {
    const host = ctx.get('host');
    console.log(`${options.desc}：用户 ${host} 访问路由 [${ctx.request.url}]~`);
    await next();
  };
};
