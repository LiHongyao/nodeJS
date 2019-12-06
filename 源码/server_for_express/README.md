# 用户接口

【1.登陆】
- 接口地址：POST /login
- 接口参数：
|账号|username|string|require|
|密码|password|string|require|

【2.注册】
- 接口地址：POST /register
- 接口参数：
|账号|username|string|require|
|密码|password|string|require|
|电话|tel     |string|options|
|邮箱|email   |string|options|


# 状态码参照表
200 - 成功
201 - 用户不存在
202 - 用户已存在
203 - 密码错误
204 - 请求参数有误
500 - 服务器异常