// => 导入模块
const mongoose = require('mongoose');

// => 连接数据库
// => URI > mongodb://用户名:密码@主机:端口/数据库名称
const uri = "mongodb://root:123@localhost:27017/mongo?authSource=admin";
const options = {
	// 1. 允许用户在新的解析器中返回旧的解析器
	useNewUrlParser: true,
	// 2. 允许自动创建索引
	useCreateIndex: true,
	// 3. 允许服务器发现和监视引擎
	useUnifiedTopology:true,
	// 4. 连接池数量/默认为5
	poolSize: 5
}
// => 回调函数
const callback = err => {
	if (err) {
		console.log({
			message: '数据库连接失败',
			error: err.message
		});
		return;
	}
	console.log("数据库连接成功...")
}
mongoose.connect(uri, options, callback)

// => 导出模块
module.exports = mongoose;
