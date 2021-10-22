/*
 * @Author: Lee
 * @Date: 2021-08-16 12:15:25
 * @LastEditors: Lee
 * @LastEditTime: 2021-08-16 13:44:21
 */

// app/schedule/task2.js
module.exports = {
  schedule: {
    interval: "5s",
    type: "all",
  },
  async task(ctx) {
    // console.log("任务2执行：" + new Date().toLocaleTimeString());
  },
};
