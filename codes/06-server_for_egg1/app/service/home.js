/*
 * @Author: Lee
 * @Date: 2021-10-15 15:35:31
 * @LastEditors: Lee
 * @LastEditTime: 2021-10-15 16:20:30
 */

// app/service/home.js
const Service = require("egg").Service;
const Mock = require("mockjs");
module.exports = class _ extends Service {
  async info() {
    // 打印中间件配置值
    console.log(this.config.logmid);
    return Mock.mock({
      "list|5": [
        {
          id: "@guid",
          title: "@ctitle",
          url: "@image(300x300, @color, #FFF, Mock.js)",
          time: '@date("yyyy-MM-dd")', // 新增time字段
        },
      ],
    });
  }
};
