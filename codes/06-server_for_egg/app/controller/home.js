/*
 * @Author: Lee
 * @Date: 2021-08-16 09:38:54
 * @LastEditors: Lee
 * @LastEditTime: 2021-10-15 15:39:03
 */

const Controller = require("egg").Controller;
module.exports = class _ extends Controller {
  async index() {
    this.ctx.body = await this.ctx.service.home.info();
  }
}

