const mongoose = require("../lib/db");
// 指定规则
const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		index: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	age: {
		type: Number,
		min: 18,
		max: 65
	},
	gender: {
		type: String,
		default: '保密'
	}
});
// 使用规则
const User = mongoose.model("User", UserSchema);

module.exports = { User };

