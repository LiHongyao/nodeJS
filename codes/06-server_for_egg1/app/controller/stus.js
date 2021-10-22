/*
 * @Author: Lee
 * @Date: 2021-10-15 13:50:05
 * @LastEditors: Lee
 * @LastEditTime: 2021-10-15 14:24:44
 */
const Controller = require("egg").Controller;

class StusController extends Controller {
  async list() {
    // 调用serview获取数据
    const data = await this.ctx.service.stus.list();
    this.ctx.body = {
      code: 0,
      data,
      msg: 'success'
    };
  }
}

module.exports = StusController;