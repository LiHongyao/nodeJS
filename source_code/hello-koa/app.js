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
