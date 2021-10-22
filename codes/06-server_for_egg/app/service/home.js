/*
 * @Author: Lee
 * @Date: 2021-10-22 21:28:30
 * @LastEditors: Lee
 * @LastEditTime: 2021-10-22 22:17:45
 */

const Mock = require("mockjs");
module.exports = class _ extends require("egg").Service {
  async info() {
    
    return Mock.mock({
      "list|5": [
        {
          id: "@guid",
          title: "@ctitle",
          url: "@image(300x300, @color, #FFF, Mock.js)",
          time: '@date("yyyy-MM-dd")', 
        },
      ],
    });
  }
};
