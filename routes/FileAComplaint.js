//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
var {
  User
} = require('../model/user');

router.get('/', isLoggedIn, function(req, res) {
  res.render('FileAComplaint.ejs', {
    user: req.user
  });

});

function isLoggedIn(req, res, next) {
  try {
    if (req.isAuthenticated()) {
      req.isLogged = true;
      return next();
    }
    res.redirect('/login-user');
  } catch (e) {
    console.log(e);
  }
}

module.exports = router;
