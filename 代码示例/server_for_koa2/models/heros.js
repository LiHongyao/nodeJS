const mongoose = require("../db");
const heroSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		index: true,
		unique: true
	},
	age: {
		type: Number,
		required: true,
		min: 18,
		max: 65
	},
	tel: {
		type: String,
		required: true
	},
	gender: {
		type: String,
		default: "保密"
	}
}, {
	collection: "heros"
});

const HeroModel = mongoose.model("Hero", heroSchema, "heros");

module.exports = HeroModel;

