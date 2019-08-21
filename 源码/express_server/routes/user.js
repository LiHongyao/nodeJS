/* 用户路由 */
// 1. 导入express模块
const express = require("express");
// 2. 获取路由对象
const router  = express.Router();
// 3. 处理路由对象
router.get("/", (req, res) => {
    res.send("客户端想要获取用户信息");
});
router.post("/login", (req, res) => {
    // 解构参数
    let {username, password} = req.body;
    console.log(username, password);
    // 数据库操作
    // 判断是否登陆成功
    if(username == "admin" && password == "123") {
        // 登陆成功
        res.send({
            nikename: "木子李",
            tel: "152-2888-5771",
            address: "成都市高新区雅和南四路216号"
        });
    }else {
        // 登陆失败
        res.send("账号或密码错误");
    }
});
router.post("/register", (req, res) => {
    res.send("客户端想要执行注册操作");
});

// 4. 导出路由
module.exports = router;




