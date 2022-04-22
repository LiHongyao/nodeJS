- [postman >>](https://www.postman.com/downloads/)
- [中文官网 >>](https://eggjs.org/zh-cn/)

# 一、概述

## 1. Egg.js 是什么？

**Egg.js 为企业级框架和应用而生**，帮助开发团队和开发人员降低开发和维护成本。

> 注：Egg.js 缩写为 Egg

## 2. 设计原则

专注提供 **核心功能** 和灵活可扩展的 **插件机制**。

奉行『**约定优于配置**』，按照 [一套统一的约定](https://eggjs.org/zh-cn/advanced/loader.html) 进行应用开发。

## 3. 特性

- 提供基于 Egg [定制上层框架](https://eggjs.org/zh-cn/advanced/framework.html) 的能力
- 高度可扩展的 [插件机制](https://eggjs.org/zh-cn/basics/plugin.html)
- 内置 [多进程管理](https://eggjs.org/zh-cn/advanced/cluster-client.html)
- 基于 [Koa](http://koajs.com/) 开发，性能优异
- 框架稳定，测试覆盖率高
- [渐进式开发](https://eggjs.org/zh-cn/tutorials/progressive.html)

## 5. Egg.js 与 Koa

[参考这里 >>](https://www.eggjs.org/zh-CN/intro/egg-and-koa)

# 三、框架内置基础对象

基本说明（10个对象）

- koa继承而来的四个对象：**<u>Application</u>**, **<u>Context</u>**, **<u>Request</u>**, **<u>Response</u>**
- 框架扩展的六个对象：**<u>Controller</u>**, **<u>Service</u>**, **<u>Helper</u>**, **<u>Config</u>**, **<u>Logger</u>**，**<u>Subscription</u>**

## 1. [Application](https://www.eggjs.org/zh-CN/basics/objects#application)

**① 说明**

1）<u>Application</u> 是全局应用对象，在一个应用中，只会实例化一个。
2）它继承自 <u>Koa.Application</u>，在它上面我们可以挂载一些全局的方法和对象。
3）我们可以轻松的在插件或者应用中扩展 Application 对象。

**② Application 的使用**

由于几乎所有被框架 [Loader](https://eggjs.org/zh-cn/advanced/loader.html) 加载的文件（<u>Controller</u>，<u>Service</u>，<u>Schedule</u> 等），都可以 **export** 一个函数，这个函数会被 <u>Loader</u> 调用，并使用 <u>app</u> 作为参数。<u>Application</u> 对象几乎可以在编写应用时的任何一个地方获取到同时设置其值。下面说下常见的做法：

1）设置Application的值

一般我们在 **app.js** 中，进行application值的第一次设置，如下（<u>app</u>参数就等价于<u>application</u>对象）

```js
module.exports = class AppBootHook {
  constructor(app) {
    this.app = app;
    app.username = "Li-HONGYAO";
  }
};
```

2）获取/修改Application 的值

- 在继承于 <u>Controller</u>, <u>Service</u> 基类的实例中，可以通过 **<u>this.app</u>** 访问到 <u>Application</u> 对象。
- 如果当前位置能访问到**ctx**对象，那么也可以通过 **<u>this.ctx.app.属性名</u>** 访问或修改。

访问示例：

```js
// app/controller/home.js
const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx, app } = this;
    console.log(app.username);
    ctx.body = 'hi, egg';
  }
}

module.exports = HomeController;
```

## 2. Context 

**① 说明**

1）<u>Context</u> 是一个 **请求级别的对象**，继承自 <u>Koa.Context</u>。
2）在<u>每一次收到用户请求</u>时，框架会实例化一个 Context 对象，这个对象封装了这次用户请求的信息，并<u>提供</u>了许多便捷的<u>方法来 **获取请求参数** 或者 **设置响应信息**。</u>
3）框架会将所有的 <u>Service</u> 挂载到 <u>Context</u> 实例上，一些插件也会将一些其他的方法和对象挂载到它上面（egg-sequelize 会将所有的 model 挂载在 Context 上）。

**② context 的使用**

最常见的 Context 实例获取方式是在 [Middleware](https://eggjs.org/zh-cn/basics/middleware.html), [Controller](https://eggjs.org/zh-cn/basics/controller.html) 以及 [Service](https://eggjs.org/zh-cn/basics/service.html) 中。

- Controller 中的获取： <u>**this.ctx**</u> 

- Service 中的获取： <u>**this.ctx**</u>

- Middleware 中的获取：中间件函数的第一个参数，如下：

  ```js
  async function middleware(ctx, next) {
  	console.log(ctx.query)
  }
  ```

**③ 非用户请求的场景下我们需要访问 service / model 等 Context 实例上的对象**

除了在请求时可以获取 **Context** 实例之外，在有些非用户请求的场景下我们需要访问 **service / model ** 等 Context 实例上的对象，我们可以通过 **<u>`Application.createAnonymousContext()`</u>** 方法创建一个匿名 Context 实例：

```js
module.exports = class AppBootHook {
  constructor(app) {
    this.app = app;
    app.username = "Li-HONGYAO";
  }
  configWillLoad() {
    const ctx = this.app.createAnonymousContext();
    console.log(ctx.helper.reverse("123"));
    console.log("__配置文件即将加载完成__");
  }
};
```

## 3. Request & Response

**① 基本说明**

1）**<u>Request</u>**：请求对象，继承自 [Koa.Request](http://koajs.com/#request)。

2）**<u>Response</u>** 响应对象，继承自 [Koa.Response](http://koajs.com/#response)。

**② 使用方法**

可以在 Context 的实例上获取到当前请求的 <u>Request</u> 和 <u>Response</u> 对象实例。

```js
const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    // 获取请求对象上的query参数
    console.log(ctx.request.query.id);
    // 获取响应对象并设置响应数据
    ctx.response.body = 'Hello, egg!';
  }
}

module.exports = HomeController;
```

- Koa 会在 <u>Context</u> 上**代理**一部分 <u>Request</u> 和 <u>Response</u> 上的方法和属性。
- 如上面例子中的 `ctx.request.query.id` 和 `ctx.query.id` 是等价的。 `ctx.response.body` 和 `ctx.body` 是等价的。
- **主要注意的是**：获取 POST 的 body 应该使用 `ctx.request.body` ，而不是 `ctx.body`。

**# 请求流程梳理**

![](./images/egg_req_res.svg)

一般而言，我们会在controller里面通过 **this.ctx.resquest/response** 获取请求参数调用service并且做出相关响应。

当然，在service、中间件、等如果有需要的话，肯定也是可以获取请求/响应对象的。

## 4. Controller

框架提供了一个 Controller 基类，并推荐所有的 [Controller](https://eggjs.org/zh-cn/basics/controller.html) 都继承于该基类实现。这个 Controller 基类有下列属性：

-  ctx - 当前请求的 [Context](https://eggjs.org/zh-cn/basics/objects.html#context) 实例。
-  app - 应用的 [Application](https://eggjs.org/zh-cn/basics/objects.html#application) 实例。
-  config - 应用的[配置](https://eggjs.org/zh-cn/basics/config.html)。
-  service - 应用所有的 [service](https://eggjs.org/zh-cn/basics/service.html)。
-  logger - 为当前 controller 封装的 logger 对象。

引用 Controller 基类：<u>**`require('egg').Controller;`**</u>

## 5. Service

框架提供了一个 Service 基类，并推荐所有的 [Service](https://eggjs.org/zh-cn/basics/service.html) 都继承于该基类实现。

Service 基类的属性和 [Controller](https://eggjs.org/zh-cn/basics/objects.html#controller) 基类属性一致，访问方式也类似：

<u>**`require('egg').Service;`**</u>

## 6. Helper

Helper 用来提供一些实用的 <u>utility</u> 函数。它的作用在于我们可以将一些常用的动作抽离在 **helper.js** 里面成为一个独立的函数，这样可以用 JavaScript 来写复杂的逻辑，避免逻辑分散各处，同时可以更好的编写测试用例。

Helper 自身是一个类，有和 [Controller](https://eggjs.org/zh-cn/basics/objects.html#controller) 基类一样的属性，它也会在每次请求时进行实例化，因此 Helper 上的所有函数也能获取到当前请求相关的上下文信息。

<u>**`this.ctx.helper.xxx`**</u>

## 7. Config

我们推荐应用开发遵循配置和代码分离的原则，将一些需要硬编码的业务配置都放到配置文件中，同时配置文件支持各个不同的运行环境使用不同的配置，使用起来也非常方便，所有框架、插件和应用级别的配置都可以通过 Config 对象获取到，关于框架的配置，可以详细阅读 [Config 配置](https://eggjs.org/zh-cn/basics/config.html)章节。

**获取方式**

我们可以通过 **<u>app.config</u>** 从 Application 实例上获取到 config 对象，也可以在 Controller, Service, Helper 的实例上通过 **<u>this.config</u>** 获取到 config 对象。

## 8. Logger

框架内置了功能强大的[日志功能](https://eggjs.org/zh-cn/core/logger.html)，可以非常方便的打印各种级别的日志到对应的日志文件中，每一个 logger 对象都提供了 4 个级别的方法：

- `logger.debug()`
- `logger.info()`
- `logger.warn()`
- `logger.error()`

在框架中提供了多个 Logger 对象，下面我们简单的介绍一下各个 Logger 对象的获取方式和使用场景。

## 9. Subscription

订阅模型是一种比较常见的开发模式，譬如消息中间件的消费者或调度任务。因此我们提供了 Subscription 基类来规范化这个模式。

可以通过以下方式来引用 Subscription 基类：

```js
const Subscription = require('egg').Subscription;

class Schedule extends Subscription {
  // 需要实现此方法
  // subscribe 可以为 async function 或 generator function
  async subscribe() {}
}
module.exports = Schedule;
```

插件开发者可以根据自己的需求基于它定制订阅规范，如[定时任务](https://eggjs.org/zh-cn/basics/schedule.html)就是使用这种规范实现的。

# 四、初体验

[逐步搭建参考指南 >>](https://www.eggjs.org/zh-CN/intro/quickstart#%E9%80%90%E6%AD%A5%E6%90%AD%E5%BB%BA)

## 1. 创建项目 

```shell
$ mkdir egg-example && cd egg-example
$ npm init -y
$ npm install egg
$ npm install egg-bin --save-dev 
```

添加 `npm scripts` 到 `package.json`：

```json
{
  "name": "egg-example",
  "scripts": {
    "dev": "egg-bin dev"
  }
}
```

## 2. 目录结构

构建目录结构：

```ini
.
├── app
    ├── controller            # 控制器/解析用户的输入，处理后返回相应的结果
        └── home.js           
    ├── extend                # 扩展
        └── helper.js         # 工具函数
    ├── public                # 静态资源（可以存放images/css/js等静态资源）
    ├── schedule              # 定时任务
    ├── service               # 编写业务逻辑层（数据处理/数据库操作等）
        └── home.js
    └── router.js             # 用于配置 URL 路由规则（前端访问路由）
├── config        
    ├── config.default.js     # 配置文件
    └── plugin.js   		  # 配置需要加载的插件
└── app.js              	  # 启动自定义：用于自定义启动时的初始化工作
```

[更多目录结构请参考官方文档 >>](https://eggjs.org/zh-cn/basics/structure.html)

**创建 <u>.gitignore</u>**

```
node_modules
logs
run

package-lock.json

.idea
.DS_Store
```

## 3. 编写Service

**① 基本说明**

在实际应用中，<u>Controller</u> 一般不会自己产出数据，也不会包含复杂的逻辑，复杂的过程应抽象为业务逻辑层 [Service](https://eggjs.org/zh-cn/basics/service.html)。（你可以认为<u>Service</u>是提供数据或对数据做复杂处理的）。

**② service 编写流程**

a. 在 <u>app/service</u> 目录下新建一个 <u>home.js</u> 文件。

b. 文件中先引入egg模块，并从模块里面获取到 <u>Service</u> 基类对象。

c. 接着定义自己的service类，此类需要继承Service基类。

d. 然后在此类中定义相关方法，此方法会返回相关的数据供<u>controller</u>进行使用。

e. 在controller中使用service时，需要通过 <u>this.ctx.service</u> 拿到相关service和数据。

**③ service 编写示例**

```js
// app/service/home.js
const Service = require('egg').Service;
class HomeService extends Service {
  async index() {
    // - 处理复杂的数据逻辑
    // - 读取数据库操作
    // - 将处理好的数据返回
    return "Hello, egg.js!"
  }
}
module.exports = HomeService;
```

**④ 拓展：数据mock -- 模拟数据**

首先我们安装mockjs依赖：

```shell
$ npm install mockjs
```

然后<u>在service中使用mock生成测试数据</u>：

```js
// app/service/home.js
const Mock = require("mockjs");
module.exports = class _ extends require("egg").Service {
  async info() {
    return Mock.mock({
      "list|5": [
        {
          id: "@guid",
          title: "@ctitle",
          url: "@image(300x300, @color, #FFF, Mock.js)",
          time: '@date("yyyy-MM-dd")', 
        },
      ],
    });
  }
};
```

> 解读：
>
> 上述示例中，我们通过mock生成了5条随机数据，关于mock配置，可以 [参考这里 >>](http://mockjs.com/)

## 4. 编写Controller

当我们创建好 Service之后，就可以在 Controller中访问 Service中访问的数据啦。

接下来我们在 <u>/app/controller</u> 目录下创建 <u>home.js</u>文件，并注入如下代码：

```js
// app/controller/home.js
const Controller = require('egg').Controller;
class HomeController extends Controller {
  async index() {
    // 调用service获取数据并响应给调用者
    this.ctx.body = await this.ctx.service.home.index();
  }
}
module.exports = HomeController;
```

## 5. 编写Router

[Router](https://eggjs.org/zh-cn/basics/router.html) 主要用来描述请求 URL 和具体承担执行动作的 Controller 的对应关系。

接下来再定义<u>router</u>路由层（这是直接面向客户端的，用户的请求都会直接到这里来）。

- 在app目录下创建一个<u>router.js</u>文件。
- 路由文件代码其实比较简单，就是一个<u>函数</u>，这个函数会接收一个<u>app</u>参数对象，app中包含了我们要使用的<u>router</u>对象和控制器对象。
- 通过app拿到了<u>router</u>对象后，我们就可以定义处理各种请求的路由了。
- 通过app拿到了<u>controller</u>对象后，我们就可以在路由回调函数里任意的调用我们想使用的<u>controller</u>。

```js
// app/router.js
module.exports = (app) => {
  const { router, controller } = app;
  // 定义一个路由
  router.get('/', controller.home.index);
};
```

## 6. 配置Cookie 安全字符串

最后我们还需要配置<u>Cookie安全字符串</u>（必须配置，否则就会报错，任意字符串都可以）：

```js
// config/config.default.js
module.exports = (app) => {
  // # 【系统配置】
  const config = (exports = {});
  // 1. 配置cookie安全字符串
  config.keys = app.name + '_1634953317990_7396';
  // # 【用户配置】
  const userConfig = {};
  return {
    ...config,
    ...userConfig,
  };
};
```

## 7. 启动项目

**① 在 <u>package.json</u> 文件中写入脚本**

```json
{
  "scripts": {
    "dev": "egg-bin dev"
  },
}
```

**② 执行命令**

```shell
$ npm run dev
```

**③ 运行效果**

![](./images/hello_egg.png)

到这里，你已成功开发一个接口并且成功访问啦，接下来，我们看下关于 <u>egg.js</u> 其他知识点吧。

# 五、核心

## 01. 配置静态资源映射

**① 基本说明**

我们只需要把静态资源放到 <u>**app/public**</u> 目录即可完成自动映射。

**② 使用示例** 

```
.
├── app
    └── public                
        └── images
            └── logo.png
```

在 <u>public/images</u> 目录下放一张  <u>logo.png</u> 图片资源。然后在浏览器输入 *`http://127.0.0.1:7001/public/images/logo.png`* 就可以访问了。

访问时我们需要拼接 <u>/public</u>，实际上如果你不想拼接，想直接通过 *`http://127.0.0.1:7001/images/egg.png`* 访问，你只需要在 *<u>config.default.js</u>* 文件中加入如下配置即可：

```js
// - 静态资源前缀
config.static = { prefix: '/' };
```

> 提示：线上环境建议部署到 [CDN](https://baike.baidu.com/item/CDN/420951)，无需该插件。

##　02. 路由分组

在配置路由的过程中如果将所有的路由全部放在 <u>app/router.js</u> 里面，难免显得太过于臃肿了。而 [官方](https://eggjs.org/zh-cn/basics/router.html#%E5%A4%AA%E5%A4%9A%E8%B7%AF%E7%94%B1%E6%98%A0%E5%B0%84) 本身提供了两种方案用于解决路由映射过多的问题。这里我们以 [egg-router-plus](https://www.npmjs.com/package/egg-router-plus) 为例。

**① 安装依赖：**

```shell
$ npm install egg-router-plus
```

**② 配置插件**

```js
// config/pugin.js
module.exports = {
  // - 路由分组
  routerPlus: {
    enable: true,
    package: 'egg-router-plus',
  },
};
```

**③ 创建路由文件**

```
.
├── app
    └── router    
        ├── home.js
        └── user.js
```

这里我们拆分了两个路由：<u>home.js</u> 和 <u>user.js</u>。

**④ 编写路由文件**

这里以 <u>router/home.js</u> 文件为例：

```js
module.exports = (app) => {
  const { router, controller } = app;
  const homeRouter = router.namespace('/home');
  homeRouter.get('/', controller.home.index);
};
```

此时访问：*http://127.0.0.1:7001/home* 即可正常访问路由。

> 提示：如果你使用路由分组，那么 <u>app/router.js</u> 文件就可以删除了。

## 03. 获取路由参数

### 3.1. path params

```js
// router/user.js
module.exports = (app) => {
  const { router, controller } = app;
  const userRouter = router.namespace('/user');
  userRouter.get('/info/:id', controller.user.info);
};
```

```js
const Controller = require('egg').Controller;
class UserController extends Controller {
  async info() {
    const { ctx } = this;
    // 获取params参数
    const id = ctx.params.id;
    ctx.body = {
      id,
      name: 'Li-HONGYAO',
    };
  }
}
module.exports = UserController;
```

> 模拟请求：`curl http://127.0.0.1:7001/user/info/123`

### 3.2. Query String

```js
ctx.query.xxx
```

> 模拟请求：`curl http://127.0.0.1:7001/user/info?id=123`

### 3.3. formData

在 <u>router/user.js</u> 中新增登录路由：

```js
module.exports = (app) => {
  const { router, controller } = app;
  const userRouter = router.namespace('/user');
  userRouter.get('/info/:id', controller.user.info);
  userRouter.post('/login', controller.user.login);
};
```

然后在 <u>controller/user.js</u> 中新增登录方法并获取参数：

```js
const Controller = require('egg').Controller;
class UserController extends Controller {
  async info() {
    const { ctx } = this;
    const id = ctx.params.id;
    ctx.body = {
      id,
      name: 'Li-HONGYAO',
    };
  }
  async login() {
    const { ctx } = this;
    console.log(ctx.request.body); // { username: 'admin', password: '123456' }
  }
}
module.exports = UserController;
```

> 模拟请求：`curl -X POST http://127.0.0.1:7001/user/login --data '{"username":"admin","password":"123456"}' --header 'Content-Type:application/json'`



## 04. 处理跨域

**① 安装依赖**

```shell
$ npm install egg-cors
```

**② 在plugin.js中设置开启cors **

```js
module.exports = {
  cors: {
    enable: true,
    package: "egg-cors",
  },
};

```

**③  在 <u>config.{env}.js</u> 中配置，注意配置覆盖的问题**

```js
// 安全性配置
config.security = {
  // 支持post
  csrf: {
    enable: false,
    ignoreJSON: true,
  },
  domainWhiteList: [],
};

// 处理跨域
config.cors = {
  origin: "*",
  allowMethods: "GET,HEAD,PUT,POST,DELETE,PATCH",
};
```

## 05. 启动自定义 

**① 基本说明**

我们常常需要 **在应用启动期间进行一些初始化工作**，等初始化完成后应用才可以启动成功，并开始对外提供服务。

框架提供了统一的入口文件 <u>app.js</u> 进行启动过程自定义，这个文件返回一个 <u>Boot</u> 类，我们可以通过定义 Boot 类中的<u>生命周期</u>方法来执行启动应用过程中的初始化工作。

框架提供了这些 [生命周期函数](https://eggjs.org/zh-cn/advanced/loader.html#life-cycles) 供开发人员处理：

- 配置文件即将加载，这是最后动态修改配置的时机（`configWillLoad`）
- 配置文件加载完成（`configDidLoad`）
- 文件加载完成（`didLoad`）
- 插件启动完毕（`willReady`）
- worker 准备就绪（`didReady`）
- 应用启动完成（`serverDidReady`）
- 应用即将关闭（`beforeClose`）

**② 编写流程**

1）在项目根目录下创建 <u>app.js</u>，然后写此Boot 类
2）在此Boot 类中定义各个声明周期函数
3）在每个声明周期函数中进行各种操作

**③ 编写示例**

```js
// app.js
class AppBootHook {
  constructor(app) {
    this.app = app;
  }

  configWillLoad() {
    // 此时 config 文件已经被读取并合并，但是还并未生效
    // 这是应用层修改配置的最后时机
    // 注意：此函数只支持同步调用
    console.log("__配置文件即将加载完成__");
  }

  async didLoad() {
    // 所有的配置已经加载完毕
    // 可以用来加载应用自定义的文件，启动自定义的服务
    console.log("__所有的配置已经加载完毕__");
  }

  async willReady() {
    // 所有的插件都已启动完毕，但是应用整体还未 ready
    // 可以做一些数据初始化等操作，这些操作成功才会启动应用
    console.log("__所有的插件都已启动完毕，但是应用整体还未 ready__");
  }

  async didReady() {
    // 应用已经启动完毕
    console.log("__应用已经启动完毕__");
  }

  async serverDidReady() {
    // http / https server 已启动，开始接受外部请求
    // 此时可以从 app.server 拿到 server 的实例
    console.log("__http / https server 已启动，开始接受外部请求__");
  }
}

module.exports = AppBootHook;
```

效果：

```
__配置文件即将加载完成__
__所有的配置已经加载完毕__
__所有的插件都已启动完毕，但是应用整体还未 ready__
__应用已经启动完毕__
__http / https server 已启动，开始接受外部请求__
```

> 注意：在自定义生命周期函数中不建议做太耗时的操作，框架会有启动的超时检测。

## 06. 扩展

**① 基本说明**

如果我们想往当前模块里面添加某些扩展功能，那么我们就可以使用 Helper 来实现。框架提供了一种快速扩展的方式，只需在 **app/extend** 目录下提供扩展脚本即可。

**② 扩展编写示例**

```js
// app/extend/helper.js
// 逆序字符串
exports.reverse = s => s.split("").reverse().join('');
```

**③ 通过 <u>ctx</u> 访问扩展**

```js
module.exports = class _ extends require("egg").Controller {
  async index() {
    // 调用扩展helper.js中的reverse方法逆序字符串
    console.log(this.ctx.helper.reverse("123"));
    this.ctx.body = await this.ctx.service.home.info();
  }
};
```

调用接口查看控制台输出：**<u>321</u>**

> 注意：
>
> - **app/extend/helper.js** 这个路径和文件名都是不能变的，否则默认解析就会失败，除非重新解析。
> - 实际上只要在能访问到 **<u>ctx</u>** 的地方都可调用 <u>拓展</u>。

## 07. Middleware

**① 基本说明**

中间件在我们的开发中很常用，比如任何请求进来时进行常规的token校验，字段过滤，甚至是反爬虫机制等，这些都可以也应该使用中间件。

**② 编写中间件流程**

1）在 **<u>app/middleware</u>** 目录下创建一个中间件js文件，编写具体的中间件函数代码。

2）使用中间件

**③ 编写中间件示例**

```js
// app/middleware/logmid.js
module.exports = (options, app) => {
  return async (ctx, next) => {
    const host = ctx.get('host');
    console.log(`${options.desc}：用户 ${host} 访问服务器~`);
    await next();
  };
};
```

**④ 使用中间件 **

<u>1）全局中间件（默认中间件）（在应用中使用中间件）</u>

在 <u>config/config.default.js</u> 中做默认中间件配置

```js
// - 中间件配置
config.middleware = ['logmid'];
config.logmid = {
  desc: '日志信息：', // 传入中间件参数（通过options访问）
};
```

> 提示：全局（默认）中间件会在每次请求来时都处理下。

<u>2）在router中使用中间件</u>

```
module.exports = app => {
  const MID_NAME = app.middleware.MID_NAME({ ...params });
  app.router.get('/needgzip', gzip, app.controller.handler);
};
```

## 08. 环境配置

文档描述：https://eggjs.org/zh-cn/basics/env.html

```json
"scripts": {
  "dev": "egg-bin dev --env=local",
  "dev-test": "egg-bin dev --env=test",
  "dev-preview": "egg-bin dev --env=preview",
  "dev-build": "egg-bin dev --env=production"
},
```

> --env = 环境名：配置当前环境

```shell
 npm run dev  //启动本地环境
 npm run dev-test  //启动测试环境
 npm run dev-preview  //启动准生产环境
 npm run dev-production  //启动生产环境
```

config 配置：

- config.default.js 默认配置
- config.local.js 本地环境配置
- config.test.js 测试环境配置
- config.preview.js 准生产环境配置
- config.production.js 生产环境配置

## 09. 定时任务

**① 基本说明**

虽然我们通过框架开发的 HTTP Server 是请求响应模型的，但是仍然还会有许多场景需要执行一些定时任务，例如：
1）定时上报应用状态。
2）定时从远程接口更新本地缓存。
3）定时进行文件切割、临时文件删除。
框架提供了一套机制来让定时任务的编写和维护更加优雅。

**② 编写流程**

所有的定时任务都统一存放在 **<u>app/schedule</u>** 目录下，每一个文件都是一个独立的定时任务，可以配置定时任务的属性和要执行的方法。
编写任务js文件时，步骤如下：
1）从egg中导入<u>Subscription</u>基类对象。
2）接着开始创建class，class继承上面得到的Subscription基类对象。
3）class里面先写个静态的schedule方法（方法名不能变），设置定时任务的执行间隔等配置。
4）class里面再写个静态的subscription方法（方法名不能变），表示执行的具体任务。
5）如果有许多定时任务，那么就写多个js文件。

**③ 编写示例**

```js
// app/schedule/task1.js
const Subscription = require("egg").Subscription;

class Task1 extends Subscription {
  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  static get schedule() {
    return {
      interval: "5s", // 时间间隔
      type: "all", // 指定所有的 worker 都需要执行
    };
  }
  // subscribe 是真正定时任务执行时被运行的函数
  async subscribe() {
    console.log("任务1执行：" + new Date().toLocaleTimeString());
    
  }
}

module.exports = Task1;
```

效果：

```
任务1执行：下午12:13:34
任务1执行：下午12:13:39
任务1执行：下午12:13:44
任务1执行：下午12:13:49
任务1执行：下午12:13:54
任务1执行：下午12:13:59
任务1执行：下午12:14:04
任务1执行：下午12:14:09
任务1执行：下午12:14:14
```

**④ 另一种写法（简写 -- 推荐）**

```js
// app/schedule/task2.js
module.exports = {
  schedule: {
    interval: "5s",
    type: "all",
  },
  async task(ctx) {
    console.log("任务2执行：" + new Date().toLocaleTimeString());
  },
};
```

**⑤ 间隔时间单位**

时（`h`）/ 分（`m`）/ 秒（`s`）

## 10. Agent（代理进程）

**① 基本说明**

我们发现有些工作其实不需要每个 Worker 都去做，如果都做，一来是浪费资源，更重要的是可能会导致多进程间资源访问冲突。
所以，对于这一类后台运行的逻辑，我们希望将它们放到一个单独的进程上去执行，这个进程就叫 Agent Worker，简称 Agent。
Agent 好比是 主进程给其他 Worker 请的一个『秘书』，它不对外提供服务，只给 App Worker 打工，专门处理一些公共事务。

**② Agent 用法**

你可以在应用或插件根目录下的 **agent.js** 中实现你自己的逻辑（和 **启动自定义** 用法类似，只是入口参数时 **agent** 对象）

```js
// agent.js
module.exports = (agent) => {
  // 在这里写你的初始化逻辑

  // 也可以通过 messenger 对象发送消息给 App Worker
  // 但需要等待 App Worker 启动成功后才能发送，不然很可能丢失
  agent.messenger.on("egg-ready", () => {
    const data = {
      name: "Li-HONGYAO",
      address: "成都市高新区雅和南四路",
    };
    agent.messenger.sendToApp("XXX_action", data);
  });
};
```



```js
// app.js
class AppBootHook {
  constructor(app) {
    this.app = app;
    this.app.messenger.on("XXX_action", (data) => {
      console.log(data);
    });
  }
}

module.exports = AppBootHook;
```

这个例子中，**agent.js** 的代码会执行在 agent 进程上， **app.js** 的代码会执行在 Worker 进程上，他们通过框架封装的 **messenger** 对象进行进程间通讯（IPC）。

## 11. egg渐进式开发

所谓的egg渐进式开发的含义是：
当我们开发一个项目时，从一个**简单的扩展功能** --> 写成一个项目中的**插件** ---> **发布**到npm上的独立插件 ---> 许多功能和插件集合到一起形成一个**框架**。

1）第一步：一个简单的扩展功能，此时写在 **app/extend** 目录下

2）第二步：写成一个项目中的插件，此时把<u>app/extend/</u>下的代码 移动到 l<u>ib/plugin/插件名/app/extend/</u>下，并且在<u>lib/plugin/插件名/package.json</u>里 声明插件，最后在<u>config/plugin.js</u> 中通过 <u>path</u> 来挂载插件

3） 第三步：发布到npm上的独立插件，此时需要构建完整的目录，然后做单元测试，最后通过npm发布

4） 第四步：许多功能和插件集合到一起形成一个框架，这部和步骤三类似，不过更复杂更庞大而已

## 12. 接口文档

### 12.1. apiDoc

生成 <u>api-document</u> 接口文档

**① 安装依赖**

```shell
$ npm install apidoc@0.29.0
```

**② 在根目录创建 <u>apidoc.json</u> 文件，并写入配置信息：**

```json
{
  "name": "Api-documents",
  "version": "1.0.0",
  "description": "Life is brief, and then you die, you know?",
  "title": "ApiDoc 文档示例",
  "url": "http://192.168.0.8:7001",
  "template": {
    "forceLanguage": "zh_cn"
  }
}

```

**③ 配置脚本**

```js
"docs": "npx apidoc -i ./app/controller/ -o app/public/docs",
```

> 解读：
>
> 根据 controller 文件中的模板注释生成接口文档放置在 <u>app/public/docs</u> 目录下。

**④ 模板注释示例**

我们在 <u>user</u> 控制器中写一个登录接口来测试一下：

```js
// app/controller/user.js

const Controller = require("egg").Controller;
module.exports = class _ extends Controller {
  /**
   * @api {POST} /user/login 登录
   * @apiName login
   * @apiGroup 用户相关
   * @apiVersion 1.0.0
   * @apiParam {String} username 登录账号
   * @apiParam {String} password 登录密码
   *       
   */
  async login() {
    // 获取参数
    const { username, password } = this.ctx.request.body;
    // 逻辑判断（理论上这一部分代码应该抽离到service中去）
    if (!username || !password) {
      this.ctx.body = {
        code: -10,
        message: "请填写用户名或密码",
      };
    } else if (username === "admin" && password === "123") {
      this.ctx.body = {
        code: 0,
        data: {
          name: "Li-HONGYAO",
          job: "全栈工程师",
          address: "成都市高新区",
        },
        message: "登录成功",
      };
    } else {
      this.ctx.body = {
        code: -10,
        message: "账号或密码错误",
      };
    }
  }
};
```

别忘记在 **router.js** 中设置该路由：

```js
 router.post("/user/login", controller.user.login);
```

**⑤ 执行指令，生成doc**

```shell
$ npm run docs
```

此时，将会在 **app/public/docs** 中看到生成的文档文件

**⑥ 访问接口文档**

浏览器键入：http://127.0.0.1:7001/docs/index.html

![](./images/egg_api_docs.png)

至此，接口文档就生成啦。

### 12.2. swagger

[官方使用文档 >>](https://www.npmjs.com/package/egg-swagger-doc)

[git](https://github.com/Yanshijie-EL/egg-swagger-doc)

**① 安装依赖**

```shell
$ npm install egg-swagger-doc
```

**② 配置**

```js
// config/config.default.js
config.swaggerdoc = {
  dirScanner: './app/controller', // 配置自动扫描的控制器路径
  apiInfo: {
    title: '接口文档',
    description: 'Swagger UI 测试接口文档',
    version: '1.0.0', //
    termsOfService: 'http://swagger.io/terms/',
    contact: {
      email: 'lihy_online@163.com',
    },
    license: {
      name: 'Apache 2.0',
      url: 'http://www.apache.org/licenses/LICENSE-2.0.html',
    },
  },
  basePath: '/', // 配置基础路径
  schemes: ['http', 'https'], // 配置支持的协议
  consumes: ['application/json'], // 指定处理请求的提交内容类型 (Content-Type)，如 application/json、text/html
  produces: ['application/json'], // 指定返回的内容类型，仅当 request 请求头中的(Accept)类型中包含该指定类型才返回
  securityDefinitions: {}, // 配置接口安全授权方式
  enableSecurity: false, // 是否启用授权，默认 false
  // enableValidate: true, // 是否启用参数校验，默认 true
  routerMap: false, // 是否启用自动生成路由(实验功能)，默认 true
  enable: true, // 默认 true
}
```

**③ 启用插件**

```js
// config/plugin.js
swaggerdoc: {
  enable: true,
  package: 'egg-swagger-doc'
}
```

**④ 编写contract**

```js
// app/contract/user.js
module.exports = {
  loginRequest: {
    username: {
      type: 'string',
      required: true,
      description: '账号',
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
```

**⑤ 编写注释**

```js
/**
 * @controller 用户
 */

// app/controller/user.js
const Controller = require('egg').Controller;

class UserController extends Controller {
  /**
   * @router post /user/login
   * @summary 登录
   * @description 接口的描述信息
   * @request body loginRequest

   */
  async login() {
    // 获取参数
    const { username, password } = this.ctx.request.body;
    // 逻辑判断（理论上这一部分代码应该抽离到service中去）
    if (!username || !password) {
      this.ctx.body = {
        code: -10,
        message: '请填写用户名或密码',
      };
    } else if (username === 'admin' && password === '123') {
      this.ctx.body = {
        code: 0,
        data: {
          name: 'Li-HONGYAO',
          job: '全栈工程师',
          address: '成都市高新区',
        },
        message: '登录成功',
      };
    } else {
      this.ctx.body = {
        code: -10,
        message: '账号或密码错误',
      };
    }
  }
}
module.exports = UserController;
```

**⑥ 访问**

http://127.0.0.1:7001/swagger-ui.html



# 六、连接数据库

## 1. MongoDB

**1）安装依赖**

```shell
$ npm install egg-mongoose 
```

- [ egg-mongoose  >>](https://www.npmjs.com/package/egg-mongoose)

- [mongoose 官方版 >>](https://mongoosejs.com/)
- [mongoose 中文版（v5.0.15） >>](http://www.mongoosejs.net/)

**2）配置 **

*`config/plugin.js`*

```js
import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  mongoose: {
    enable: true,
    package: 'egg-mongoose',
  },
};

export default plugin;
```
*`config/config.default.js`*

```js
config.mongoose = {
  // -- 账号密码 → url: 'mongodb://账号:密码@localhost:27017',
  url: 'mongodb://localhost:27017',
  options: {
    dbName: 'TEST_PRO',
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};
```

**3）创建 Schema，生成模型**

*`app/model/student.ts`*

```typescript
import { Application } from 'egg';

module.exports = (app: Application) => {
  // -- 引入建立连接的mongoose
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  // -- 数据库表的映射
  const StudentSchema = new Schema(
    {
      // -- 这里主要用于关联某一张表
      // -- ref 为关联表名字
      // xx_id: {
      //   type: Schema.Types.ObjectId,
      //   required: true,
      //   ref: 'xx',
      // },
      name: String,
      age: {
        type: Number,
        min: 18,
        max: 60,
      },
      sex: {
        type: Number,
        enum: [-1, 0, 1], // [未知, 女, 男]
        default: -1,
      },
      phone: {
        type: String,
        unique: true,
        match: [/^1[3-9][0-9]{9}$/, '手机号格式错误'],
        required: [true, '手机号必填'],
      },
      address: String,
    },
    {
      timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }, // 生成时间
    }
  );
  // -- mongoose.model(Model, StudentSchema, 'students')
  return mongoose.model('Student', StudentSchema, 'students');
};

```

[更多 Schema Types 参考这里 >>](https://www.mongodb.com/docs/realm/schemas/types/)

**4）操作**

```typescript
import { Service } from 'egg';

export default class StudentService extends Service {
  public async push() {
    const { ctx } = this;
    try {
      const r = await ctx.model.Student.create({
        ...ctx.request.body,
      });
      return r;
    } catch (error) {
      console.log(error);
      return JSON.stringify(error);
    }
  }
}
```



# 七、拓展

## 1. token 验证

通过 `egg-jwt` 中间件实现token验证。

**1）安装依赖**

```shell
$ npm install egg-jwt
```

**2）配置**

*`config/plugin.js`*

```json
import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  jwt: {
    enable: true,
    package: 'egg-jwt',
  },
};

export default plugin;
```

*`config/config.default.js`*

```js
config.jwt = {
  secret: 'secret', // 秘钥
};
```

> Tips：如果使用了ts，需要在根目录下的 *`typings/index.d.ts`* 文件里声明一个 `any` 类型，否则会类型错误： 

```typescript
import 'egg';

declare module 'egg' {
  interface Application {
    jwt: any;
  }
}
```

**3）使用**

在 `controller` 中使用，比如  *`app/controller/user.ts`*

```js
public async login() {
  const { ctx, app } = this;
  // -- 假设登录成功，生成token
  const token = app.jwt.sign(
    {
      ...ctx.request.body,
    },
    app.config.jwt.secret,
    {
      expiresIn: '60m', // 时间自己定，具体可参考jsonwebtoken插件官方说
    }
  );
  // -- 将生成的token返回给前端
  ctx.body = {
    token,
  };
}
```

调用接口，即可拿到token

```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50IjoiMTczOTg4ODg2NjkiLCJwYXNzd29yZCI6IjEyMzQ1NiIsImlhdCI6MTY1MDQyNzI3MiwiZXhwIjoxNjUwNDMwODcyfQ.qSi2eLa9Lho0F5uMrQdjUr0NNqbqiCOdHxYMrJIVbzM"
}
```

**4）中间件**

中间件可以减少代码，方便使用，比如：*`app/middleware/jwt.ts`*

```typescript
module.exports = (options: any) => {
  return async function jwt(ctx, next) {
    const token = ctx.request.header.authorization;
    if (token) {
      try {
        // 解码token
        const decode = ctx.app.jwt.verify(token, options.secret);
        console.log('解析Token:', decode);
        await next();
      } catch ({ message }) {
        ctx.status = 401;
        ctx.body = {
          msg: message,
        };
        return;
      }
    } else {
      ctx.status = 401;
      ctx.body = {
        msg: 'Request headers miss ‘Authorization’ with token.',
      };
      return;
    }
  };
};
```

**5）鉴权**

在 `router` 中对要鉴权的路由进行注册：

```js
const jwt = app.middleware.jwt(app.config.jwt);
router.get('/user/info', jwt, controller.user.info);
```

客户端在调用接口时需在 `header` 中传递 `Authorization` 参数：

```json
{
  "Authorization": "token string"
}
```

> Tips：此处传递 `token`，无需在前面拼接 `Bearer `



