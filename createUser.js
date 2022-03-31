const mongoose = require("mongoose");
const { User } = require("./functions/models/User");
require("dotenv").config();
const crypto = require("crypto");

(async () => {
	mongoose.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	});
	const db = mongoose.connection;
	db.on("error", console.error.bind(console, "MongoDB connection error:"));

	const hashedPassword = crypto
		.createHash("sha256")
		.update(process.env.MY_SECRET_PASS) //write your password in your env file
		.digest("hex");

	const res = await User.create({
		username: "uri", //write your name here, whatever you want, it's not important
		password: hashedPassword,
		key: crypto.randomBytes(32).toString("hex")
	});
	console.log("hashedPassword: ", hashedPassword);
	console.log(res);
	console.log("User Created!");
})();
