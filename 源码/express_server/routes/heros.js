/* 英雄路由 */
// 1. 导入express模块
const express = require("express");
// 2. 获取路由对象
const router  = express.Router();
// 3. 处理路由对象
// 3.1. 读取数据库信息
// 导入获取connection对象的方法
const getConnection = require("../mysqlConnection.js");
router.get("/", (req, res) => {
    // 链接数据库
    const db = getConnection();
    // 链接
    db.connect();
    const {name} = req.query;
    const sql = "SELECT * FROM heros WHERE name = ?";
    const sqlParams = [name];
    function fn(err, sqlRes) {
        if(err) {
            console.log(err.message);
        }else {
            // 将结果发送给客户端
            res.send(JSON.stringify(sqlRes));
        }
    }
    db.query(sql, sqlParams, fn);
    // 断开链接
    db.end();
});

router.get("/delete", (req, res) => {
    // 链接数据库
    const db = getConnection();
    // 链接
    db.connect();
    const {id} = req.query;
    const sql = "DELETE FROM heros WHERE id = ?";
    const sqlParams = [id];
    function fn(err, sqlRes) {
        if(err) {
            console.log(err.message);
        }else {
            // 将结果发送给客户端
            res.send(JSON.stringify(sqlRes));
        }
    }
    db.query(sql, sqlParams, fn);
    // 断开链接
    db.end();
});


router.get("/update", (req, res) => {
    // 链接数据库
    const db = getConnection();
    // 链接
    db.connect();
    const {name, location} = req.query;
    const sql = "UPDATE  heros SET location = ? WHERE name = ?";
    const sqlParams = [location, name];
    function fn(err, sqlRes) {
        if(err) {
            console.log(err.message);
        }else {
            // 将结果发送给客户端
            res.send(JSON.stringify(sqlRes));
        }
    }
    db.query(sql, sqlParams, fn);
    // 断开链接
    db.end();
});


router.get("/insert", (req, res) => {
    // 链接数据库
    const db = getConnection();
    // 链接
    db.connect();
    const {name, skill} = req.query;
    const sql = "INSERT INTO heros (name, skill) VALUES (?,?)";
    const sqlParams = [name, skill];
    function fn(err, sqlRes) {
        if(err) {
            console.log(err.message);
        }else {
            // 将结果发送给客户端
            res.send(JSON.stringify(sqlRes));
        }
    }
    db.query(sql, sqlParams, fn);
    // 断开链接
    db.end();
});
// 4. 导出路由
module.exports = router;
