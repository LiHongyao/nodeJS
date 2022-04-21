/*
 * @Author: Lee
 * @Date: 2022-04-21 15:07:51
 * @LastEditors: Lee
 * @LastEditTime: 2022-04-21 18:15:51
 */
import { Application } from 'egg';

module.exports = (app: Application) => {
  // 引入建立连接的mongoose
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  // 数据库表的映射
  const StudentSchema = new Schema({
    name: String,
    age: Number,
    sex: {
      type: String,
      default: '保密',
    },
    phone: String,
    address: String,
  });
  return mongoose.model('Students', StudentSchema, 'students');
};
