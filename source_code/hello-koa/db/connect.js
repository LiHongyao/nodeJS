// 导入模块
const mongoose = require('mongoose');
// 拼接URI => mongodb://用户名:密码@主机:端口/数据库名称
const MONGODB_URI = `mongodb://lihy:123@localhost:27017/mongo`;

const start = () => {
    // 连接数据库
    mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
    // 连接成功
    mongoose.connection.on('connected', () => {
        console.log('Mongoose connection success!');
    });
    // 连接失败
    mongoose.connection.on('error', (err) => {
        console.log('Mongoose connection error: ' + err);
    });
    // 连接断开
    mongoose.connection.on('disconnected', () => {
        console.log('Mongoose connection disconnected!');
    });
}

module.exports = {
    start
};




