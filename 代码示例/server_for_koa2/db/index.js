// => 导入模块
const mongoose = require('mongoose');
// => URI > mongodb://用户名:密码@主机:端口/数据库名称
const MONGODB_URI = "mongodb://root:123@localhost:27017/mongo";
// => 连接数据库
mongoose.connect(MONGODB_URI, { useNewUrlParser: true }, (err) => {
	if (err) {
		console.log('mongodb connect fail!');
		return;
	}
	console.log("mongodb connect success!")
});
module.exports = mongoose;
