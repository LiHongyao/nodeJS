/*
 * @Author: Lee
 * @Date: 2021-10-22 21:28:21
 * @LastEditors: Lee
 * @LastEditTime: 2021-10-22 22:53:23
 */

module.exports = class _ extends require("egg").Controller {
  async index() {
    // 调用扩展helper.js中的reverse方法逆序字符串
    console.log(this.ctx.helper.reverse("123"));
    console.log(this.app.username);
    this.ctx.body = await this.ctx.service.home.info();
  }
  async list() {
    const id = this.ctx.request.query.id;
    this.ctx.response.body = `返回id为[${id}]的数据`;
  }
};
