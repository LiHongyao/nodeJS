/*
 * @Author: Lee
 * @Date: 2022-05-07 13:52:57
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-08 12:41:51
 * @Description: 返回报文格式
 */

export interface IResponse<T = any> {
  code: number /** 状态码 */;
  data?: T /** 响应数据 */;
  msg?: string /** 提示信息 */;
  page?: {
    pageNo: number;
    pages: number;
    total: number;
  };
}
