// 主页路由
let express = require("express");
let router  = express.Router();

// http://127.0.0.1:8081/goods/query
router.get(["/", "/query"], (req, res, next) => {
    res.send("查询商品!");
});

// http://127.0.0.1:8081/goods/push
router.get("/push", (req, res, next) => {
    res.send("添加商品!");
});

// http://127.0.0.1:8081/goods/delete
router.get("/delete", (req, res, next) => {
    res.send("移除商品!");
});

// http://127.0.0.1:8081/goods/modify
router.get("/modify", (req, res, next) => {
    res.send("修改商品!");
});

module.exports = router;