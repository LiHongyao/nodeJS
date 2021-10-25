/*
 * @Author: Lee
 * @Date: 2021-10-24 21:00:38
 * @LastEditors: Lee
 * @LastEditTime: 2021-10-24 21:21:29
 */

module.exports = {
  schedule: {
    interval: '5s',
    type: 'all',
  },
  async task(ctx) {
    // console.log('定时任务执行：' + new Date().toLocaleTimeString());
  },
};
