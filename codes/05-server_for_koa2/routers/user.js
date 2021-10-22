// => 导入路由模块
const router = require('koa-router')();
const { User } = require('../models/user');
router.prefix('/api/user');

// 注册用户
router.post('/register', async ctx => {
    let { username, password } = ctx.request.body;
    let user = await User.create({
        username,
        password
    });
    ctx.body = {
        message: "注册成功"
    }

});
// 用户登陆
router.post('/login', async ctx => {
    let { username, password } = ctx.request.body;
    let user = await User.findOne({ username });
    if(!user) {
        ctx.body = {
            message: "用户不存在"
        }
    }else if(user.username === username && user.password === password) {
        ctx.body = {
            message: "登陆成功"
        }
    }else {
        ctx.body = {
            message: "密码错误"
        }
    }
    
})
// 修改密码
router.post('/password', async ctx => {
    let { username, password } = ctx.request.body;
    await User.updateOne({ username }, { password });
    ctx.body = {
        message: "密码已修改"
    }
})
// 删除用户
router.post('/delete', async ctx => {
    let { username } = ctx.request.body;
    await User.deleteOne({ username });
    ctx.body = {
        message: "用户已删除"
    }
})
// 查询用户
router.get('/', async ctx => {
    let users = await User.find();
    ctx.body = {
        message: "查询成功",
        users
    }
})

// => 导出路由配置
module.exports = router.routes();