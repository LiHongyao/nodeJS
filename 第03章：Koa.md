[官网地址 >>](https://www.koajs.com.cn/)

# 一、概述

koa 是由 Express 原班人马打造的，致力于成为一个更小、更富有表现力、更健壮的 Web 框架。使用 koa 编写 web 应用，通过组合不同的 generator，可以免除重复繁琐的回调函数嵌套，并极大地提升错误处理的效率。koa 不在内核方法中绑定任何中间件，它仅仅提供了一个轻量优雅的函数库，使得编写 Web 应用变得得心应手。

```shell
# NPM
$ npm install koa
# Yarn
$ yarn add koa
```

代码示例：

```js
const Koa = require("koa");
const app = new Koa();

// 对于任何请求，app将调用该异步函数处理请
app.use(async (ctx, next) => {
    console.log(ctx);
    ctx.body = 'Hello World';
  	await next();
});
app.listen(3000);
console.log("server running at http://localhost:3000")
```

# 二、处理路由

下载middleware：

```shell
$ npm install koa-router
```
代码示例：
```js
const Koa = require("koa");
const app = new Koa();
const router = require("koa-router")();

app.use(async (ctx, next) => {
    console.log(`${ctx.request.method} ${ctx.request.url}`);
    await next();
});

router.get('/', async (ctx, next) => {
    ctx.response.body = "<h1>Hello, Koa!</h1>";
});
router.get('/info', async (ctx, next) => {
    ctx.response.body = JSON.stringify({
        name: "木子李",
        tel: "17398888669"
    });
});

app.use(router.routes());
app.listen(3000);
console.log("server running at http://localhost:3000/")

```

