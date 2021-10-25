/*
 * @Author: Lee
 * @Date: 2021-10-24 22:10:08
 * @LastEditors: Lee
 * @LastEditTime: 2021-10-25 12:58:55
 */
/**
 * @controller 英雄
 */
const Controller = require('egg').Controller;
class HeroController extends Controller {
  /**
   * @router get /heros/list
   * @summary 英雄列表
   * @description 查询英雄列表
   */
  async list() {
    const { ctx } = this;
    ctx.body = await ctx.service.heros.list();
  }
}
module.exports = HeroController;
