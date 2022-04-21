/*
 * @Author: Lee
 * @Date: 2022-04-19 16:16:13
 * @LastEditors: Lee
 * @LastEditTime: 2022-04-21 16:01:17
 */
import { Controller } from 'egg';

export default class UserController extends Controller {
  public async info() {
    const { ctx } = this;
    ctx.body = {
      name: 'Li-HONGYAO',
      address: '四川省成都市高新区雅和南四路216号',
    };
  }
  /**
   * 登录
   */
  public async login() {
    const { ctx, app } = this;
    // -- 假设登录成功，生成token
    const token = app.jwt.sign(
      {
        ...ctx.request.body,
      },
      app.config.jwt.secret,
      {
        expiresIn: '24h',
      }
    );
    // -- 将生成的token返回给前端
    ctx.body = {
      token,
    };
  }
  /**
   * 微信登录
   */
  public async loginForWx() {
    const { ctx } = this;
    const { code } = ctx.request.body;
    const APP_ID = 'wx169565989539bf7d';
    const APP_SECRET = '5732e4c98058b1edb4b6ab1adb7ff9f7';
    const url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${APP_ID}&secret=${APP_SECRET}&code=${code}&grant_type=authorization_code`;
    const { data } = await ctx.curl(url, {
      dataType: 'json',
    });
    ctx.body = {
      code: 0,
      data,
    };
  }
}
