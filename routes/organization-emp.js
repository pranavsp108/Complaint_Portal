//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const router = express.Router();
var {
  User
} = require('../model/user');
var Grievance = require('../model/grievance');
const user = require('../model/user');

router.use(express.static(path.join(__dirname + '/../public')));

// GET ROUTES
// router.get('/', isLoggedIn, function(req, res) {
//   Grievance.find({},function(err,res){
//     if (err)
//       console.log(err);
//     else{
//       res.render('sample', {
//         user: req.user,
//         grievance : res
//       });
//     }
//   });
//
// });

router.route('/')
  .get((req, res) => {
    Grievance.find({Ministry: req.user.emp_ministry})
      .then((result) => {
        console.log(result);
        res.render('sample', {
          grievance:result,
          user: req.user
        });
      }).catch((err) => console.log(err));
  })

  router.get('/submit/:id', isLoggedIn, function(req, res) {
    Grievance.findOne({_id:req.params.id}, function(err,res1){
      if(err){
        console.log(err);
      }
      else{
        if(res1.status == 'Submitted')
          res1.status='Reviewed';
        else if(res1.status == 'Reviewed')
          res1.status = 'In Progress';
        else if(res1.status == 'In Progress')
          res1.status = 'Resolved';
        res1.save();
      }
    });
    res.redirect('/organization-emp');
  });

  router.post('/user', isLoggedIn, function(req, res){
    console.log(req.body.userdetail);
    user.findOne({_id: req.body.userdetail}, function(err, res1){
      res.render('userDetail', {user: res1});
    });
  });

router.get('/post', isLoggedIn, function(req, res) {
  res.render('postMinistry', {
    user: req.user,
    Ministry: 'Posts'
  });
});

router.get('/health', isLoggedIn, function(req, res) {
  res.render('health', {
    user: req.user,
    Ministry: 'Health & Family Welfare'
  });
});

router.get('/external_affair', isLoggedIn, function(req, res) {
  res.render('external_affair', {
    user: req.user,
    Ministry: 'External Affair'
  });
});

router.get('/banking', isLoggedIn, function(req, res) {
  res.render('banking', {
    user: req.user,
    Ministry: 'Banking'
  });
});

router.get('/insurance', isLoggedIn, function(req, res){
  res.render('insurance', {
    user: req.user,
    Ministry: 'Insurance'
  });
});

router.get('/telecoms', isLoggedIn, function(req, res){
  res.render('telecoms', {
    user: req.user,
    Ministry: 'Telecoms'
  });
});

router.get('/road', isLoggedIn, function(req, res){
  res.render('telecoms', {
    user: req.user,
    Ministry: 'Road Transport And Highways'
  });
});

router.get('/schooledu', isLoggedIn, function(req, res){
  res.render('schooledu', {
    user: req.user,
    Ministry: 'School Education and Literacy'
  });
});

router.get('/petroleum', isLoggedIn, function(req, res){
  res.render('petroleum', {
    user: req.user,
    Ministry: 'Petroleum and Natural Gas'
  });
});

// //POST ROUTES
// router.post('/post1', isLoggedIn, function(req, res) {
//   //console.log(req.body);
//   var newcomplaint = new Grievance();
//   newcomplaint.Ministry = req.body.Mini_Value;
//   newcomplaint.Main_category = req.body.Main_Cat_Value;
//   newcomplaint.Sub_category = req.body.Sub_Cat_Value;
//   newcomplaint.Description = req.body.Grievance;
//   newcomplaint.user = req.user._id;
//   newcomplaint.save();
// });

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
