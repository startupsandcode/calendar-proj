const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

let UserSchema = new mongoose.Schema({

	local: {
		email: { type: String, required: true, unique: true},
		password: { type: String, required: true},
		firstName: {type: String},
		lastName: {type: String}
	}
},{
	timestamps: true
});

// encrypt password when signing up
UserSchema.methods.encrypt = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

// compare entered password(after hashing) to previously stored hash
UserSchema.methods.isValidPassword = function (password) {
	return bcrypt.compareSync(password,this.local.password);
};

module.exports = mongoose.model('User',UserSchema);



