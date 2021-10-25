/*
 * @Author: Lee
 * @Date: 2021-10-25 09:12:42
 * @LastEditors: Lee
 * @LastEditTime: 2021-10-25 14:01:02
 */

/**
 * @controller 用户
 */

// app/controller/user.js
const Controller = require('egg').Controller;

class UserController extends Controller {
  /**
   * @router post /user/login
   * @summary 登录
   * @description 用户登录
   * @request body loginRequest
   */
  async login() {
    // 获取参数
    const { username, password } = this.ctx.request.body;
    // 逻辑判断（理论上这一部分代码应该抽离到service中去）
    if (!username || !password) {
      this.ctx.body = {
        code: -10,
        message: '请填写用户名或密码',
      };
    } else if (username === 'admin' && password === '123') {
      this.ctx.body = {
        code: 0,
        data: {
          name: 'Li-HONGYAO',
          job: '全栈工程师',
          address: '成都市高新区',
        },
        message: '登录成功',
      };
    } else {
      this.ctx.body = {
        code: -10,
        message: '账号或密码错误',
      };
    }
  }
  async info() {
    const { ctx } = this;
    const id = ctx.params.id;
    ctx.body = {
      id,
      name: 'Li-HONGYAO',
    };
  }
}
module.exports = UserController;
