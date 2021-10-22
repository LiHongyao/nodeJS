/*
 * @Author: Lee
 * @Date: 2021-08-16 11:05:58
 * @LastEditors: Lee
 * @LastEditTime: 2021-10-22 17:03:04
 */

// app/extend/helper.js

exports.relativeTime = (time) =>
  time.replace("-", "年").replace("-", "月") + "日";
