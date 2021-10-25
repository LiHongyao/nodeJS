/*
 * @Author: Lee
 * @Date: 2021-10-24 22:08:39
 * @LastEditors: Lee
 * @LastEditTime: 2021-10-24 22:08:40
 */
const Service = require('egg').Service;

class HeroService extends Service {
  async list() {
    const { ctx } = this;
    return (await ctx.model.Heros.find()) || [];
  }
}

module.exports = HeroService;
