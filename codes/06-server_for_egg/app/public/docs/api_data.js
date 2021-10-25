define({ "api": [
  {
    "type": "POST",
    "url": "/user/login",
    "title": "登录",
    "name": "login",
    "group": "用户相关",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>登录账号</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>登录密码</p>"
          }
        ]
      }
    },
    "filename": "app/controller/user.js",
    "groupTitle": "用户相关"
  }
] });
