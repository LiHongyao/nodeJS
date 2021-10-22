/*
 * @Author: Lee
 * @Date: 2021-08-16 11:23:59
 * @LastEditors: Lee
 * @LastEditTime: 2021-10-15 16:21:47
 */

// app/middleware/logmid.js
// options === app.config.logmid

module.exports = (options, app) => {
  return async function (ctx, next) {
    const host = ctx.get("host");
    const desc = options.desc;
    console.log("-----------------------------------");
    console.log(desc + host + "访问进了此服务器");
    console.log("-----------------------------------");
    await next();
  };
};
