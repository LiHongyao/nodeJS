/* 订单路由 */
// 1. 导入express模块
const express = require("express");
// 2. 获取路由对象
const router  = express.Router();
// 3. 处理路由对象
router.get("/", (req, res) => {
    // city
    console.log(req.query.city);
    res.send("客户端想要获取订单信息");
});
router.get("/add", (req, res) => {
    // 获取请求参数
    console.log(req.query);
    res.send("客户端想要添加一条订单");
});
router.get("/delete", (req, res) => {
    res.send("客户端想要删除一条订单");
});
router.get("/update", (req, res) => {
    res.send("客户端想要更新一条订单");
});

// 4. 导出路由
module.exports = router;