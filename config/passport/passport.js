var localSignupStrategy = require('./local-signup-strategy');
var localLoginStrategy = require('./local-login-strategy');
var googleStrategy = require('./google-oauth-login-strategy');

var User = require('../../models/userModel');

var passportConfig = function (passport) {
	//strategies
	passport.use('local-signup', localSignupStrategy);
	passport.use('local-login', localLoginStrategy);
	passport.use('google-login', googleStrategy);

	//session support
	passport.serializeUser(function (user, callback) {
		callback(null, user.id);
	});

	passport.deserializeUser(function (id, callback) {
		User.findById(id, function (err, user) {
			callback(err, user);
		})
	});

};

module.exports = passportConfig;