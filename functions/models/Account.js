const mongoose = require("mongoose");

const accountSchema = mongoose.Schema(
	{
		name: {
			type: String
		},
		email: {
			type: String
		},
		username: {
			type: String
		},
		hint: {
			type: String
		},
		password: {
			type: String
		}
	},
	{ timestamps: true }
);

const Account = mongoose.model("Account", accountSchema, "Accounts");

module.exports = { Account };
