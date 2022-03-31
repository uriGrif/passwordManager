const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
	{
		username: {
			type: String
		},
		password: {
			type: String
		},
		key: {
			type: String
		}
	},
	{ timestamps: true }
);

userSchema.pre("save", function (next) {
	var user = this;

	if (user.isModified("password")) {
		bcrypt.genSalt(10, function (err, salt) {
			if (err) return next(err);

			bcrypt.hash(user.password, salt, function (err, hash) {
				if (err) return next(err);
				user.password = hash;
				next();
			});
		});
	} else {
		next();
	}
});

userSchema.methods.comparePassword = async function (plainPassword) {
	return await bcrypt.compare(plainPassword, this.password);
};

const User = mongoose.model("User", userSchema, "Users");

module.exports = { User };
