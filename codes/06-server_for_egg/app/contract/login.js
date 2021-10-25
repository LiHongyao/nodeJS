/*
 * @Author: Lee
 * @Date: 2021-10-25 13:59:28
 * @LastEditors: Lee
 * @LastEditTime: 2021-10-25 13:59:47
 */

module.exports = {
  loginRequest: {
    username: {
      type: 'string',
      required: true,
      description: '用户名',
      example: 'admin',
    },
    password: {
      type: 'string',
      required: true,
      description: '密码',
      example: '123',
    },
  },
};
