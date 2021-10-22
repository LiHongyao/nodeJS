/*
 * @Author: Lee
 * @Date: 2021-10-15 12:55:25
 * @LastEditors: Lee
 * @LastEditTime: 2021-10-15 13:49:24
 */
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  // 定义表结构
  const StusSchema = new Schema({
    name: {type: String, require: true},
    age: { type: Number, require: true},
    major: { type: String, require: true},
    address: { type: String, require: true},
    birth: { type: String, require: true}
  });
  return mongoose.model('Stus', StusSchema);
}