// => 导入模块
const Koa = require('koa'); 
const cors = require('koa2-cors'); 
const bodyParser = require('koa-bodyparser'); 
const path = require('path'); 
const static = require('koa-static');
const router = require('./router');
const app = new Koa();

// => 处理跨域
app.use(cors());
// => 解析POST参数
app.use(bodyParser());
// => 处理路由
app.use(router.routes()).use(router.allowedMethods());
// => 处理静态资源
app.use(static(
    path.join(__dirname, "./www")
))

// => 监听
app.listen(3000, () => {
	console.log('server running at http://localhost:3000');
});