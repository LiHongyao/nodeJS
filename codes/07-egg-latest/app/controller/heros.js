/*
 * @Author: Lee
 * @Date: 2021-10-24 22:10:08
 * @LastEditors: Lee
 * @LastEditTime: 2021-10-24 22:11:26
 */
const Controller = require('egg').Controller;
class HeroController extends Controller {
  async list() {
    const { ctx } = this;
    ctx.body = await ctx.service.heros.list();
  }
}
module.exports = HeroController;
