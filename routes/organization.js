//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const router = express.Router();
var User = require('../model/user');
var Grievance = require('../model/grievance');
const multer = require('multer');

router.use(express.static(path.join(__dirname + '/../public')));

var storage = multer.diskStorage({
  destination: function(req, file, callback) {
    if (file.mimetype === 'application/pdf') {
      callback(null, './uploads');
    } else {
      callback(new Error('file type not supported'), false);
    }
  },
  filename: function(req, file, callback) {
    if (file.mimetype === 'application/pdf') {
      callback(null, file.fieldname + '-' + Date.now() + '.pdf');
    } else {
      callback(new Error('file type not supported'), false);
    }
  }
});
var upload = multer({
  storage: storage
});
// GET ROUTES
router.get('/', isLoggedIn, function(req, res) {
  res.render('organization', {
    user: req.user
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

//POST ROUTES
router.post('/post1', upload.single('uploadfile'),isLoggedIn, function(req, res) {
  const file = req.file;
  //console.log(req.body);
  var newcomplaint = new Grievance();
  newcomplaint.Ministry = req.body.Mini_Value;
  newcomplaint.Main_category = req.body.Main_Cat_Value;
  newcomplaint.Sub_category = req.body.Sub_Cat_Value;
  newcomplaint.Description = req.body.Remarks;
  newcomplaint.user = req.user._id;
  newcomplaint.date_posted = Date.now();
  newcomplaint.status = 'Submitted';
  newcomplaint.uploadfile = file;
  newcomplaint.save();

  res.redirect('/myGrievances');
});

router.post('/health1', upload.single('uploadfile'),isLoggedIn, function(req, res) {
  const file = req.file;
  //console.log(req.body);
  var newcomplaint = new Grievance();
  newcomplaint.Ministry = req.body.Mini_Value;
  newcomplaint.Main_category = req.body.Main_Cat_Value;
  newcomplaint.Sub_category = req.body.Sub_Cat_Value;
  newcomplaint.Description = req.body.Remarks;
  newcomplaint.user = req.user._id;
  newcomplaint.date_posted = Date.now();
  newcomplaint.status = 'Submitted';
  newcomplaint.uploadfile = file;
  newcomplaint.save();

  res.redirect('/myGrievances');
});

router.post('/banking1',  upload.single('uploadfile'),isLoggedIn, function(req, res) {
  const file = req.file;
  //console.log(req.body);
  var newcomplaint = new Grievance();
  newcomplaint.Ministry = req.body.Mini_Value;
  newcomplaint.Main_category = req.body.Main_Cat_Value;
  newcomplaint.Sub_category = req.body.Sub_Cat_Value;
  newcomplaint.Description = req.body.Remarks;
  newcomplaint.user = req.user._id;
  newcomplaint.date_posted = Date.now();
  newcomplaint.status = 'Submitted';
  newcomplaint.uploadfile = file;
  newcomplaint.save();
  res.redirect('/myGrievances');
});

router.post('/insurance1',  upload.single('uploadfile'),isLoggedIn, function(req, res) {
  const file = req.file;
  var newcomplaint = new Grievance();
  newcomplaint.Ministry = req.body.Mini_Value;
  newcomplaint.Main_category = req.body.Main_Cat_Value;
  newcomplaint.Sub_category = req.body.Sub_Cat_Value;
  newcomplaint.Description = req.body.Remarks;
  newcomplaint.user = req.user._id;
  newcomplaint.date_posted = Date.now();
  newcomplaint.status = 'Submitted';
  newcomplaint.uploadfile = file;
  newcomplaint.save();
  res.redirect('/myGrievances');
});

router.post('/externalaffair1',  upload.single('uploadfile'),isLoggedIn, function(req, res) {
  const file = req.file;
  //console.log(req.body);
  var newcomplaint = new Grievance();
  newcomplaint.Ministry = req.body.Mini_Value;
  newcomplaint.Main_category = req.body.Main_Cat_Value;
  newcomplaint.Sub_category = req.body.Sub_Cat_Value;
  newcomplaint.Description = req.body.Remarks;
  newcomplaint.user = req.user._id;
  newcomplaint.date_posted = Date.now();
  newcomplaint.status = 'Submitted';
  newcomplaint.uploadfile = file;
  newcomplaint.save();
  res.redirect('/myGrievances');
});

router.post('/petroleum1', upload.single('uploadfile'),isLoggedIn, function(req, res) {
  const file = req.file;
  //console.log(req.body);
  var newcomplaint = new Grievance();
  newcomplaint.Ministry = req.body.Mini_Value;
  newcomplaint.Main_category = req.body.Main_Cat_Value;
  newcomplaint.Sub_category = req.body.Sub_Cat_Value;
  newcomplaint.Description = req.body.Remarks;
  newcomplaint.user = req.user._id;
  newcomplaint.date_posted = Date.now();
  newcomplaint.status = 'Submitted';
  newcomplaint.uploadfile = file;
  newcomplaint.save();
  res.redirect('/myGrievances');
});

router.post('/road1', upload.single('uploadfile'),isLoggedIn, function(req, res) {
  const file = req.file;
  //console.log(req.body);
  var newcomplaint = new Grievance();
  newcomplaint.Ministry = req.body.Mini_Value;
  newcomplaint.Main_category = req.body.Main_Cat_Value;
  newcomplaint.Sub_category = req.body.Sub_Cat_Value;
  newcomplaint.Description = req.body.Remarks;
  newcomplaint.user = req.user._id;
  newcomplaint.date_posted = Date.now();
  newcomplaint.status = 'Submitted';
  newcomplaint.uploadfile = file;
  newcomplaint.save();
  res.redirect('/myGrievances');
});

router.post('/schooledu1',  upload.single('uploadfile'),isLoggedIn, function(req, res) {
  const file = req.file;
  //console.log(req.body);
  var newcomplaint = new Grievance();
  newcomplaint.Ministry = req.body.Mini_Value;
  newcomplaint.Main_category = req.body.Main_Cat_Value;
  newcomplaint.Sub_category = req.body.Sub_Cat_Value;
  newcomplaint.Description = req.body.Remarks;
  newcomplaint.user = req.user._id;
  newcomplaint.date_posted = Date.now();
  newcomplaint.status = 'Submitted';
  newcomplaint.uploadfile = file;
  newcomplaint.save();

  res.redirect('/myGrievances');
});

router.post('/telecoms1',  upload.single('uploadfile'),isLoggedIn, function(req, res) {
  const file = req.file;
  //console.log(req.body);
  var newcomplaint = new Grievance();
  newcomplaint.Ministry = req.body.Mini_Value;
  newcomplaint.Main_category = req.body.Main_Cat_Value;
  newcomplaint.Sub_category = req.body.Sub_Cat_Value;
  newcomplaint.Description = req.body.Remarks;
  newcomplaint.user = req.user._id;
  newcomplaint.date_posted = Date.now();
  newcomplaint.status = 'Submitted';
  newcomplaint.uploadfile = file;
  newcomplaint.save();
  res.redirect('/myGrievances');
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
