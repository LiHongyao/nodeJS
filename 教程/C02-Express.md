# 一、什么是Express？

<http://www.expressjs.com.cn/>

基于 [Node.js](https://nodejs.org/en/) 平台，快速、开放、极简的 Web 开发框架。提供了一系列强大特性帮助你创建各种Web 应用，和丰富的 HTTP 工具。使用 Express 可以快速地搭建一个完整功能的网站。

Express 框架核心特性：

- 可以设置中间件来响应HTTP 请求。

- 定义了路由表用于执行不同的HTTP 请求动作。

- 可以通过向模板传递参数来动态渲染HTML 页面。

# 二、安装

通过npm安装：

```shell
$ npm i -S express
```

安装完成后，我们可通过如下指令查看express版本号：

```shell
$ npm list express
└── express@4.17.1 
```

不过一般以下几个重要的模块是需要与express 框架一起安装的：

- `body-parser` ： nodeJS中间件，用于处理 JSON, Raw, Text 和 URL 编码的数据。

- `cookie-parser` ：解析Cookie的工具 。通过req.cookies可以取到传过来的cookie，并把它们转成对象。

- `multer`：nodeJS中间件，用于处理 enctype="multipart/form-data"（设置表单的MIME编码）的表单数据。

```shell
$ npm i -S body-parser cookie-parser multer
```

# 三、构建服务器

在项目根目录创建app.js文件

```js
// 导入express
const 导入express = require("express");
// 创建express实例
const app= express();
// 监听http://127.0.0.1:8081"
app.listen(8081, "127.0.0.1");
// 打印输出提示信息
console.log("running at http://127.0.0.1:8081");
// 测试
app.get("/", (req, res) => {
  	// 响应，向前端发送数据
    res.send("Hello, exporess!");
});
```

终端执行脚本，运行app.js

```shell
$ node app.js
```

在浏览器输入：“http://127.0.0.1:8081”，可看到页面输出“Hello, exporess!”

# 四、处理跨域

## 1. 允许所有域名跨域

```js
app.all("*", (req, res, next) => {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin","*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers","content-type");
    //跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.send(200);  // 让options尝试请求快速结束
    else
        next();
});
```

## 2. 允许指定域名跨域

假定允许 “http://127.0.0.1:5500” 访问：

```js
app.all("*", (req, res, next) => {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin","http://127.0.0.1:5500");
    //允许的header类型
    res.header("Access-Control-Allow-Headers","content-type");
    //跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.send(200);  //让options尝试请求快速结束
    else
        next();
});
```

## 3. 允许多个域名跨域

```js
app.all("*", (req,res,next) => {
    //定义允许跨域的域名集合
    const origin_list = [
        "http://127.0.0.1:5500",
        "http://127.0.0.1:5501",
        "http://127.0.0.1:5502"
    ];
    if(origin_list.includes(req.headers.origin.toLowerCase())) {
        //设置允许跨域的域名，*代表允许任意域名跨域
        res.header("Access-Control-Allow-Origin", req.headers.origin);
    }
    //允许的header类型
    res.header("Access-Control-Allow-Headers","content-type");
    //跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.send(200);  //让options尝试请求快速结束
    else
        next();
});
```

# 五、路由

## 1. 基本操作

路由是指如何定义应用的端点（URIs）以及如何响应客户端的请求。路由是一个由URI、HTTP请求（GET/POST等）和若干个句柄组成，它的语法结构如下：

```js
app.METHOD(PATH, HANDLER)
```

语法解读：

- `app`：express对象的一个实例
- `METHOD`：http请求方法（get/post），小写
- `PATH`：服务器上的路径
- `HANDLER`：当路由匹配时要执行的处理函数

```js
// GET 请求
app.get("/", (req, res) => {
    res.send('Got a GET request')
});

// POST 请求
app.post('/usr', function (req, res) {
  res.send('Got a POST request at /usr')
})
```

路由方法的第一个参数可以为一个字符串，也可以为一个数组，为字符串时还可以使用正则匹配。

```js
// 正则匹配，*表示0个或多个字符
app.get("/ab*cd", (req, res) => {
    res.send("正则匹配");
});

// 路由处理也可以是一个数组
app.post(["/usr", "/user"], (req, res) => {
    res.send();
});
```

## 2. 模块化配置

将路由定义在app.js文件中，不利于阅读维护，特别是在项目比较大的情况下，所以我们需要将路由模块化。比如项目有用户、登陆和商品功能，那我们就定义3个路由，文件结构如下：

```
|- proj
	|- routes
  		|- user.js
  		|- login.js
  		|- goods.js
  |- app.js	
```

*user.js*

```js
// 用户路由
let express = require("express");
let router  = express.Router();

// http://127.0.0.1:8081/user
router.get("/", (req, res, next) => {
    res.send("访问用户信息!");
});

// http://127.0.0.1:8081/user/orders
router.get("/orders", (req, res, next) => {
    res.send("访问用户订单!");
});

// http://127.0.0.1:8081/user/modify
router.post("/modify", (req, res, next) => {
    res.send("修改用户信息!");
});

module.exports = router;
```

*login.js*

```js
// 登陆路由
let express = require("express");
let router  = express.Router();

// http://127.0.0.1:8081/login
router.post("/", (req, res, next) => {
    // 读取参数
    console.log(req.body);
    res.send("用户登陆!");
});

module.exports = router;
```

*goods.js*

```js
// 主页路由
let express = require("express");
let router  = express.Router();

// http://127.0.0.1:8081/goods/query
router.get(["/", "/query"], (req, res, next) => {
    res.send("查询商品!");
});

// http://127.0.0.1:8081/goods/push
router.get("/push", (req, res, next) => {
    res.send("添加商品!");
});

// http://127.0.0.1:8081/goods/delete
router.get("/delete", (req, res, next) => {
    res.send("移除商品!");
});

// http://127.0.0.1:8081/goods/modify
router.get("/modify", (req, res, next) => {
    res.send("修改商品!");
});

module.exports = router;
```

*app.js*

```js
// 1.导入express
const express = require("express");
// 2.创建express实例
const app = express();
// 3.配置
app.all("*", (req, res, next) => {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin", "*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers", "content-type");
    //跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    next();
});
// 3. 中间件
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 4. 路由
// 4.1. 导入路由
const userRouter  = require("./routes/user");
const loginRouter = require("./routes/login");
const goodsRouter = require("./routes/goods");
// 4.2. 应用路由
app.use("/user", userRouter);
app.use("/login", loginRouter);
app.use("/goods", goodsRouter);

// 5. 监听：http://127.0.0.1:8081"
app.listen(8081, "127.0.0.1");

// 6. 打印输出提示信息
console.log("server running at http://127.0.0.1:8081");
```

# 六、参数

### 2.1. GET

在Express中直接使用请求对象 `req` 的 `query` 属性即可获取，而且最终获取的还是已经被转换为对象了的参数，在原生nodeJS实现中，我们还需要使用 `queryString` 模块来进行显式的转换。

![](../资源/express-get-query.png)

### 2.2. POST

这里需要使用我们刚才安装的 `body-parser` 模块，获取POST参数，需注意以下几点：

- 前端代码需要传递请求头，请求参数需以JSON字符串形式传递。

- 后端代码需要添加中间件 `body-parser`（**牢记**）
- 经过中间件的处理，参数会自动的添加到req请求对象上，作为其一个属性query

![](../资源/express-post-query.png)

前端代码：

```js
fetch("http://127.0.0.1:8081/login", {
    method: "post",
    body: JSON.stringify({
        username: "admin",
        password: "123"
    }),
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    }
})
.then(res => res.json())
.then(res => {
    console.log(res);
});
```

后端代码：

```js
// 导入中间件 body-parser
const bodyParser = require("body-parser");
// application/x-www-form-urlencoded 解析
app.use(bodyParser.urlencoded({extended:false}));
// application/json 解析
app.use(bodyParser.json());
// 监听post请求
app.post("/login", (req, res) => {
    // 打印参数
    console.log(req.body);
    // 响应数据
    res.send({
        nikename: "木子李",
        tel: "152-2888-5771",
        address: "成都市高新区雅和南四路216号"
    });
});
```

关于body-parser中间件详细内容可参考如下文章：

<https://www.jianshu.com/p/ea0122ad1ac0>

# 七、请求与响应

- [request](http://www.expressjs.com.cn/4x/api.html#req)：HTTP请求对象，包含了请求查询字符串，参数，内容，HTTP 头部等属性
- [response](http://www.expressjs.com.cn/4x/api.html#res)：HTTP 响应对象，即在接收到请求时向客户端发送的 HTTP 响应数据

在Express中，请求对象与相应对象作为路由处理函数的参数返回，如下所示：

```js
app.get("/", (req, res) => {});
```

关于req、res常用属性和方法，点击上述链接进入API文档查看。



# 八、静态资源访问

通过Express 提供的内置中间件 **<ins>express.static</ins>** ，我们可以实现访问静态资源（如图片、CSS、JavaScript等）的需求。例如，如果将图片、CSS、JavaScript 文件放在 public 目录下，你可以这么写：

```js
app.use(express.static("public"));
```

那我们即可在浏览器中通过”http://127.0.0.1:8081/images/logo.png“访问静态资源了。

服务器端静态资源的文件结构如下：

```
|- proj
	 └── routes
	 └── app.js
	 └── public
  	 		└── images
  	 		└── javascripts 		
  	 		└── stylesheets
```

总结：

\1. 在最开始处使用express内置的static中间件，来实现静态文件的访问。

\2. 前端访问时，地址栏只需输入服务器地址 + express.static 参数类的路径和文件名称即可。

# 九、操作数据库

# 十、文件操作

## 1. 上传

## 2. 下载







​     

























