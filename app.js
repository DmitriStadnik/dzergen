var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var generatorRouter = require('./routes/generator');

const mongodb = require('mongodb');

if (process.env.NODE_ENV !== 'production') {
  const env = require('node-env-file'); // щтоб вытащить URI из файла
  env(__dirname + '/env/.env');
}
const uri = process.env.URI;

var app = express();

app.use(require("cors")());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "client/build")));

app.use('/', indexRouter);
app.use('/api/generator', generatorRouter);

mongodb.MongoClient.connect(uri, function (err, db) {
  if(err){
    return console.log(err);
  }
  else console.log('mongo connect success');
  // const dzerdanCollection = db.collection('generated-items');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render('error');
  res.json(err);
});

module.exports = app;
