/*
 * @Author: Lee
 * @Date: 2021-08-16 11:05:58
 * @LastEditors: Lee
 * @LastEditTime: 2021-08-16 11:06:45
 */

// app/extend/helper.js

exports.relativeTime = (time) => time.replace("-", "年").replace("-", "月") + "日";
