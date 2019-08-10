// 登陆路由
let express = require("express");
let router  = express.Router();

// http://127.0.0.1:8081/login
router.post("/", (req, res, next) => {
    // 读取参数
    console.log(req.body);
    res.send("用户登陆!");
});

module.exports = router;