// 用户路由
let express = require("express");
let router  = express.Router();

// http://127.0.0.1:8081/user
router.get("/", (req, res, next) => {
    res.send("访问用户信息!");
});

// http://127.0.0.1:8081/user/orders
router.get("/orders", (req, res, next) => {
    res.send("访问用户订单!");
});

// http://127.0.0.1:8081/user/modify
router.post("/modify", (req, res, next) => {
    res.send("修改用户信息!");
});

module.exports = router;