// => 导入路由模块
const router = require('koa-router')();
// => 处理路由
router.post('/login', (ctx, next) => {
    console.log(`「登录接口」 被调用！`)
    ctx.body = {
        code: 200,
        message: "用户登录！"
    };
    next();
});
router.post('/register', (ctx, next) => {
    console.log(`「注册接口」 被调用！`)
    ctx.body = {
        code: 200,
        message: "用户注册！"
    };
    next();
});
router.get('/info', (ctx, next) => {
    console.log(`「用户信息接口」 被调用！`);
    ctx.body = {
        code: 200,
        message: "获取用户信息！"
    };
    next();
})
// => 导出路由配置
module.exports = router.routes();