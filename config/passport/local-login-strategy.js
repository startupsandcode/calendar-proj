var LocalStrategy = require('passport-local').Strategy;
var User          = require('../../models/userModel');

var strategy = new LocalStrategy({
		usernameField : 'login_email',
		passwordField : 'login_password',
		passReqToCallback : true
	},
	function (req, email, password, callback) {
		User.findOne({ 'local.email' : email }, function (err, user) {
			if (err) return callback(err);
			if (!user){
				//user not found
				return callback(null, false, req.flash('error', 'Incorrect Account Details'));
			}
			// validate password
			if (!user.isValidPassword(password)){
				return callback(null, false, req.flash('error', 'Incorrect Account Details'));
			}
			return callback(null, user);
		});
	});

module.exports = strategy;