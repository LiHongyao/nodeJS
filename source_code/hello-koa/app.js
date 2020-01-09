const Koa = require('koa');
const cors = require('koa2-cors');
const bodyParser = require('koa-bodyparser');
const path = require('path');
const static = require('koa-static');
const router = require('koa-router')(); // 注意：引入的方式
const app = new Koa();

router.get('/', (ctx, next) => {
	ctx.body = "Hello koa!";
})
router.get('/info', (ctx, next) => {
	let {query, querystring} = ctx.requeset;
	ctx.body = {
		query,
		querystring
	}
	
});
router.post('/login', async (ctx) => {
	console.log(ctx.request.body);
	ctx.body = JSON.stringify({
		code: 200,
		message: "操作成功!"
	})
});


app.use(cors());
app.use(bodyParser());
app.use(router.routes());
app.use(static(
    path.join(__dirname, "./www")
))
app.use(router.allowedMethods());

app.listen(3000, () => {
	console.log('server running at http://localhost:3000');
});
