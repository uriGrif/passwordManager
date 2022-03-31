const mongoose = require("mongoose");
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

	const bodyToken = event.body ? JSON.parse(event.body).token : null;
	const queryToken = event.queryStringParameters.token;

	jwt.verify(
		queryToken || bodyToken,
		process.env.JWT_SECRET,
		function (err, decoded) {
			if (err) {
				return {
					statusCode: 401,
					body: JSON.stringify({
						message: "Token inválido"
					})
				};
			}
		}
	);

	if (event.httpMethod === "GET") {
		try {
			const accounts = await Account.find();
			return {
				statusCode: 200,
				body: JSON.stringify(accounts)
			};
		} catch (error) {
			return {
				statusCode: 500,
				body: JSON.stringify({
					error,
					message: "Error getting accounts"
				})
			};
		}
	} else if (event.httpMethod === "POST") {
		const body = JSON.parse(event.body);
		try {
			const newAccount = await Account.create(body.account);
			return {
				statusCode: 200,
				body: JSON.stringify({
					newAccount,
					message: "Account created successfully"
				})
			};
		} catch (error) {
			return {
				statusCode: 500,
				body: JSON.stringify({
					error,
					message: "Error creating account"
				})
			};
		}
	} else if (event.httpMethod === "PATCH") {
		const body = JSON.parse(event.body);
		try {
			const newAccount = await Account.findByIdAndUpdate(
				body.account._id,
				body.account
			);
			return {
				statusCode: 200,
				body: JSON.stringify({
					newAccount,
					message: "Account updated successfully"
				})
			};
		} catch (error) {
			return {
				statusCode: 500,
				body: JSON.stringify({
					error,
					message: "Error updating account"
				})
			};
		}
	} else if (event.httpMethod === "DELETE") {
		const body = JSON.parse(event.body);
		try {
			const deletedAccount = await Account.findByIdAndDelete(body._id);
			return {
				statusCode: 200,
				body: JSON.stringify({
					deletedAccount,
					message: "Account deleted successfully"
				})
			};
		} catch (error) {
			return {
				statusCode: 500,
				body: JSON.stringify({
					error,
					message: "Error deleting account"
				})
			};
		}
	}
};
