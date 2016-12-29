var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/', function(req, res, next) {
  // controller.homePage(req, res);
  if (req.isAuthenticated()){
    res.redirect('/calendar');
  }  else {
    res.redirect('/login');
  }

});

router.get('/signup', function (req,res,next) {
  res.render('../views/partials/accessForms/signup', {
    message: req.flash()
  });
});

router.post('/signup', function(req, res, next) {
  var signUpStrategy = passport.authenticate('local-signup', {
    successRedirect : '/',
    failureRedirect : '/signup',
    failureFlash : true
  });

  return signUpStrategy(req, res, next);
});

router.get('/login', function (req, res, next) {
  res.render('../views/partials/accessForms/login', {
    message: req.flash()
  });
});

router.post('/login', function(req, res, next) {
  var loginProperty = passport.authenticate('local-login', {
    successRedirect : '/calendar',
    failureRedirect : '/login',
    failureFlash : true
  });

  return loginProperty(req, res, next);
});

router.get('/auth/google', passport.authenticate('google-login', { scope : ['profile', 'email'] }));

// the callback after google has authenticated the user
router.get('/auth/google/callback',
    passport.authenticate('google-login', {
      successRedirect : '/calendar',
      failureRedirect : '/'
    }));

router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});
////////////////////////////////////////////////////////////////////

router.get('/calendar',authenticate, function(req, res, next) {
  res.render('../views/partials/mainCalendar', {
    message: req.flash()
  });
});




////////////////////////////////////////////////////////////////////

module.exports = router;

/////////////////////////////////////////////////////////////////////

function authenticate(req, res, next) {
  if(!req.isAuthenticated()) {
    req.flash('error', 'Please signup or login.');
    res.redirect('/login');
  }
  else {
    next();
  }
}

