/*
 * @Author: Lee
 * @Date: 2021-10-24 12:04:24
 * @LastEditors: Lee
 * @LastEditTime: 2021-10-24 20:56:57
 */

const Controller = require('egg').Controller;
class HomeController extends Controller {
  async index() {
    // 调用service获取数据并响应给调用者
    this.ctx.body = await this.ctx.service.home.index();
  }
}
module.exports = HomeController;
