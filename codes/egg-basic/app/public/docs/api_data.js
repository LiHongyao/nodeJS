define({ "api": [
  {
    "type": "POST",
    "url": "/user/login",
    "title": "用户登录",
    "description": "<p>用户登录接口 /user/login</p>",
    "version": "1.0.0",
    "name": "login",
    "group": "用户相关接口",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>用户名</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>登录密码</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "入参示例:",
          "content": "{\n  \"username\": \"admin\",\n  \"password\": \"123\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>消息体，请参照后台给的文档</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>请求状态 0 请求成功</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>错误消息</p>"
          }
        ]
      }
    },
    "filename": "app/controller/home.js",
    "groupTitle": "用户相关接口"
  }
] });
