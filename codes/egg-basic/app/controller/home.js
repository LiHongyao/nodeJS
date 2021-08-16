/*
 * @Author: Lee
 * @Date: 2021-08-16 09:38:54
 * @LastEditors: Lee
 * @LastEditTime: 2021-08-16 15:52:44
 */

const Controller = require("egg").Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = `Hello, egg.js!`;
    // 在controller里面设置获取
    console.log(this.app.username);
    console.log(this.ctx.app.username);
    const { app, ctx } = this;
    const id = ctx.request.query.id;
    ctx.response.body = app.cache.get(id);
  }
  /**
   * @api {POST} /user/login 用户登录
   * @apiDescription 用户登录接口 /user/login
   * @apiVersion 1.0.0
   * @apiName login
   * @apiGroup 用户相关接口
   * @apiParam {String} username 用户名
   * @apiParam {String} password 登录密码
   * @apiParamExample {json} 入参示例:
   * {
   *   "username": "admin",
   *   "password": "123",
   * }
   * @apiSuccess {Object} data 消息体，请参照后台给的文档
   * @apiSuccess {Number} code 请求状态 0 请求成功
   * @apiSuccess {String} msg 错误消息
   */

  async login() {
    const { username, password } = this.ctx.request.body;
    if (username === "admin" && password === "123") {
      this.ctx.body = {
        status: 200,
        data: {
          token: 1,
          name: "Li-HONGYAO",
        },
        msg: "login success",
      };
    } else {
      this.ctx.body = {
        status: 200,
        data: null,
        msg: "login fail",
      };
    }
  }
}

module.exports = HomeController;

