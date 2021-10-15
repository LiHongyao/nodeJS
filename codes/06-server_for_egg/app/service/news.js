/*
 * @Author: Lee
 * @Date: 2021-08-16 10:39:31
 * @LastEditors: Lee
 * @LastEditTime: 2021-08-16 12:01:20
 */

// app/service/news.js
const Service = require("egg").Service;
const Mock = require("mockjs");
class NewsService extends Service {
  async list() {
    // 打印中间件配置值
    console.log(this.config.logmid);
    return Mock.mock({
      "list|5": [
        {
          id: "@guid",
          title: "@ctitle",
          url: "/",
          time: '@date("yyyy-MM-dd")', // 新增time字段
        },
      ],
    });
  }
}

module.exports = NewsService;
