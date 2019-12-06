
// 1. 获取router实例
const router = require("express").Router();
const getConnection = require("../mysqlConnection");
const querystring = require("querystring");
const {host, port } = require('../http');
// 2. 处理路由
// => 查询英雄
router.get("/", (req, res) => {
    console.log("「查询英雄接口」被调用...");
    let { id } = req.query;
    const db = getConnection();
    let sql = "";
    if (id) {
        sql = `SELECT * FROM heros WHERE id = ${id}`;
    } else {
        sql = `SELECT * FROM heros`;
    }
    db.connect();
    db.query(sql, (err, sqlRes) => {
        if (err) {
            console.log("GET_HEROS_ERROR=>", err.message);
            res.send({
                code: 500,
                data: "服务器异常"
            })
        } else {
            // 拼接资源地址
            sqlRes = sqlRes.map(item => {
                item.avatar = `http://${host}${port === "80" ? "" : ":" + port }/images/${item.avatar}`;
                return item;
            });
            let data = id ? sqlRes[0] : sqlRes;
            res.send({
                code: 200,
                data
            });
        }
    });
    db.end();

});
// => 添加英雄
router.post("/add", (req, res) => {
    console.log("「添加英雄接口」被调用...");

});
// => 修改英雄
router.post("/modify", (req, res) => {
    console.log("「修改英雄接口」被调用...");
    let params = req.body;
    let { id } = params;
    delete params.id;
    let obj = {};
    for (let key in params) {
        let value = params[key];
        if (typeof params[key] == "string") {
            obj[key] = `'${value}'`
        } else {
            obj[key] = value
        }
    };
    const text = decodeURI(querystring.stringify(obj).replace(/&/g, ","));
    const db = getConnection();
    const sql = `UPDATE heros SET ${text} WHERE id = ${id}`;
    db.connect();
    db.query(sql, (err, sqlRes) => {
        if (err) {
            console.log("DELETE_HERO_ERROR=>", err.message);
            res.send({
                code: 500,
                data: "服务器异常"
            });
        } else {
            res.send({
                code: 200,
                data: "修改成功"
            });
        }
    })
    db.end();

});
// => 删除英雄
router.post("/delete", (req, res) => {
    console.log("「删除英雄接口」被调用...");
    let { id } = req.body;
    if (!id) {
        res.send({
            code: 204,
            data: "请求参数有误"
        });
        return false;
    };
    const db = getConnection();
    const sql = `DELETE FROM heros WHERE id = ${id}`;
    db.connect();
    db.query(sql, (err, sqlRes) => {
        if (err) {
            console.log("DELETE_HERO_ERROR=>", err.message);
            res.send({
                code: 500,
                data: "服务器异常"
            })
        } else {
            res.send({
                code: 200,
                data: "删除成功"
            });
        }
    });
    db.end();
});


// 3. 导出路由
module.exports = router;
