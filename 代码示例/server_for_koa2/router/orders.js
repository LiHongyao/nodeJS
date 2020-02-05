// => 导入路由模块
const router = require('koa-router')();
// => 处理路由
router.get('/', (ctx, next) => {
    console.log(`「查询订单接口」 被调用！`)
    ctx.body = {
        code: 200,
        message: "查询订单"
    };
    next();
});
router.get('/delete', (ctx, next) => {
    console.log(`「删除订单接口」 被调用！`)
    ctx.body = {
        code: 200,
        message: "删除订单"
    };
    next();
});
// => 导出路由配置
module.exports = router.routes();