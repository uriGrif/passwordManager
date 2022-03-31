const mongoose = require("mongoose");
const { User } = require("./models/User");
const { Account } = require("./models/Account");
require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.handler = async function (event, context) {
	mongoose.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	});
	const db = mongoose.connection;
	db.on("error", console.error.bind(console, "MongoDB connection error:"));

	if (event.httpMethod === "POST") {
		const body = JSON.parse(event.body);
		const user = (await User.find())[0];
		const isMatch = await user.comparePassword(body.password);
		if (isMatch) {
			return {
				statusCode: 200,
				body: JSON.stringify({
					key: user.key,
					token: jwt.sign(
						{ username: user.username },
						process.env.JWT_SECRET,
						{ expiresIn: "10m" }
					),
					accounts: await Account.find()
				})
			};
		} else {
			return {
				statusCode: 401,
				body: JSON.stringify({
					message: "Invalid password"
				})
			};
		}
	}
};
