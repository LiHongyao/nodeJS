/*
 * @Author: Lee
 * @Date: 2021-10-24 22:05:36
 * @LastEditors: Lee
 * @LastEditTime: 2021-10-24 22:07:57
 */

module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  // 定义表结构
  const HerosSchema = new Schema({
    name: { type: String, require: true },
    position: { type: String, require: true },
    speciality: { type: String, require: true },
    proficient: { type: String, require: true },
    skills: { type: Array, require: true },
  });
  return mongoose.model('Heros', HerosSchema);
};
