// jshint esversion:6

require("dotenv").config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const morgan = require('morgan');
const session = require('express-session');
const http = require('http');
const configDB = require('./config/database');
const FileAComplaint = require('./routes/FileAComplaint');
const organization = require('./routes/organization');
const myGrievances = require('./routes/myGrievances');
const organization_emp = require('./routes/organization-emp');
const chat = require('./routes/chat');
const multer = require('multer');
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

mongoose.connect(configDB.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});



require('./config/passport')(passport);

var app = express();
// var http = require('http').createServer(app);
// var io = require('socket.io')(http);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));
app.use(session({
  secret: process.env.SESSION_SECRET
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
require('./routes/UserLogin')(app, passport);

// app.use('/', indexRouter);
app.use('/FileAComplaint', FileAComplaint);
app.use('/organization', organization);
app.use('/organization-emp', organization_emp);
app.use('/myGrievances', myGrievances);
app.use('/chat', chat);
// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });
//
// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// app.get('/chat1', (req, res) => {
//   string= req.user._id
//   res.redirect('http://localhost:3000/'+string);
// });
//
// io.on('connection', (socket) => {
//   console.log('a user connected');
// });

// var proxy = require('express-http-proxy');

// app.use('/chat1', proxy('3000', {
//     forwardPath: function (req, res) {
//       return '/path/where/you/want/to/proxy/' + req.url
//     }
// }))

app.get('/help', function (req,res){
  res.render('help' , {
    user:req.user
  });
});
app.listen(3002, function(err) {
  console.log('Server started on 3002');
});
