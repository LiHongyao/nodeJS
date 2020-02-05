// => 导入模块
const Koa = require('koa'); 
const cors = require('koa2-cors'); 
const bodyParser = require('koa-bodyparser'); 
const path = require('path'); 
const static = require('koa-static');
const router = require('./router');
const app = new Koa();

const HeroModel = require('./models/heros');
// => 存储数据
let hero = new HeroModel({
	name: "木子李",
	age: 27,
	tel: "17398888669",
	gender: "男"
});
hero.save((err, res) => {
	if(err) {
		console.log(err);
		return;
	}
	console.log(res);
})

// => 查询数据
HeroModel.find((err, res) => {
	if(err) {
		console.log(err);
		return;
	}
	console.log(res);
});

// => 修改数据
HeroModel.updateOne({name: "木子李"}, {age: 30}, (err, res) => {
	if(err) {
		console.log(err);
		return;
	}
	console.log("修改成功!");
});

// => 删除数据
HeroModel.deleteOne({name: "木子李"}, (err, res) => {
	if(err) {
		console.log(err);
		return;
	}
	console.log("删除成功!");
})

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