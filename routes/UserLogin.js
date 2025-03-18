//jshint esversion:6

var {
  User
} = require('../model/user');

module.exports = function(app, passport) {
  app.get('/', function(req, res) {
    res.render('index.ejs', {
      user: req.user
    });
  });

  app.get('/login-user', function(req, res) {

    // render the page and pass in any flash data if it exists
    res.render('login-user.ejs', {
      message: req.flash('loginMessage')
    });
  });

  app.get('/login-emp', function(req, res) {

    // render the page and pass in any flash data if it exists
    res.render('login-emp.ejs', {
      message: req.flash('loginMessage')
    });
  });

  app.post('/login-user', passport.authenticate('local-login-user', {
    successRedirect: '/', // redirect to the secure profile section
    failureRedirect: '/login-user', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));

  app.post('/login-emp', passport.authenticate('local-login-emp', {
    successRedirect: '/organization-emp', // redirect to the secure profile section
    failureRedirect: '/login-emp', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));



  app.get('/signup-user', function(req, res) {

    // render the page and pass in any flash data if it exists
    res.render('signup-user.ejs', {
      message: req.flash('signupMessage')
    });
  });

  app.get('/signup-emp', function(req, res) {

    // render the page and pass in any flash data if it exists
    res.render('signup-emp.ejs', {
      message: req.flash('signupMessage')
    });

  });

  app.post('/signup-user', passport.authenticate('local-signup-user', {
    successRedirect: '/', // redirect to the secure profile section
    failureRedirect: '/signup-user', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));

  app.post('/signup-emp', passport.authenticate('local-signup-emp', {
    successRedirect: '/organization-emp', // redirect to the secure profile section
    failureRedirect: '/signup-emp', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));

  app.get('/verify', function(req, res) {
    console.log(req.user);
    User.findOne({
      'local.email': req.user.local.email
    }, function(err, user) {
      if (user.local.isVerified) {
        res.redirect('/');
      } else {
        res.render('verify.ejs', {
          user: req.user // get the user out of session and pass to template
        });
      }
    });
  });

  app.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile.ejs', {
      user: req.user // get the user out of session and pass to template
    });
    console.log(req);
  });

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });
  //
  // app.get('/auth/facebook', passport.authenticate('facebook', {
  //     scope: ['email']
  // }));
  // app.get('/auth/facebook/callback',
  //     passport.authenticate('facebook', {
  //         successRedirect: '/',
  //         failureRedirect: '/login'
  //     }));

  app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
  }));

  // the callback after google has authenticated the user
  app.get('/auth/google/oye-internshala',
    passport.authenticate('google', {
      successRedirect: '/profile',
      failureRedirect: '/login'
    }));
};

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    req.isLogged = true;
    return next();
  }
  res.redirect('/');
}
