//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const router = express.Router();
var User = require('../model/user');
var Grievance = require('../model/grievance');

router.use(express.static(path.join(__dirname + '/../public')));

router.get('/', isLoggedIn, function(req, res) {
  Grievance.find({user:req.user._id},function(err,res1){
    if (err)
      console.log(err);
    else{
      res.render('myGrievances', {
        myGrievances: res1,
        user: req.user
      });
    }
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
