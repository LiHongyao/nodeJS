
// 1. 获取router实例
const router = require("express").Router();
// 2. 处理路由
// => jsonp
router.get("/jsonp", (req, res) => {
    let fnName = req.query.callback;
    let data = {
        name: "木子李",
        address: "四川省成都市高新区"
    }
    res.send(`${fnName}(${JSON.stringify(data)})`);
});
// 3. 导出路由
module.exports = router;
