/*
 * @Author: Lee
 * @Date: 2021-10-15 13:52:01
 * @LastEditors: Lee
 * @LastEditTime: 2021-10-15 16:20:24
 */

// app/service/stus.js
const Service = require("egg").Service;
const Mock = require("mockjs");
class StusService extends Service {
  async list() {
   
    return await this.ctx.model.Stus.find() || [];
  }
}

module.exports = StusService;