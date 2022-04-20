/*
 * @Author: Lee
 * @Date: 2022-04-20 12:17:41
 * @LastEditors: Lee
 * @LastEditTime: 2022-04-20 14:44:04
 */
module.exports = (options: any) => {
  return async function jwt(ctx, next) {
    const token = ctx.request.header.authorization;
    if (token) {
      try {
        // 解码token
        const decode = ctx.app.jwt.verify(token, options.secret);
        console.log('解析Token:', decode);
        await next();
      } catch ({ message }) {
        ctx.status = 401;
        ctx.body = {
          msg: message,
        };
        return;
      }
    } else {
      ctx.status = 401;
      ctx.body = {
        msg: 'Request headers miss ‘Authorization’ with token.',
      };
      return;
    }
  };
};
