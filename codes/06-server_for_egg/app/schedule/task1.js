/*
 * @Author: Lee
 * @Date: 2021-08-16 12:10:12
 * @LastEditors: Lee
 * @LastEditTime: 2021-10-15 16:24:30
 */

// app/schedule/task1.js
const Subscription = require("egg").Subscription;

class Task1 extends Subscription {
  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  static get schedule() {
    return {
      interval: "5s", // 时间间隔
      type: "all", // 指定所有的 worker 都需要执行
    };
  }
  // subscribe 是真正定时任务执行时被运行的函数
  async subscribe() {
    // console.log("任务1执行：" + new Date().toLocaleTimeString());
    
  }
}

module.exports = Task1;
