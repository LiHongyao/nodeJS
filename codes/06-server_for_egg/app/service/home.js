/*
 * @Author: Lee
 * @Date: 2021-10-24 11:57:07
 * @LastEditors: Lee
 * @LastEditTime: 2021-10-24 11:58:22
 */

// app/service/home.js
const Service = require('egg').Service;

class HomeService extends Service {
  async index() {
    // - 处理复杂的数据逻辑
    // - 读取数据库操作
    // - 将处理好的数据返回
    return {
      name: 'Li-HONGYAO',
      job: '全栈工程师',
      address: '成都市高新区',
    };
  }
}

module.exports = HomeService;
