const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");
const console = require('console');
const mongoose = require('mongoose');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const itemsRouter = require('./routes/items');
const projectsRouter = require('./routes/projects');


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(jwt());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/items', itemsRouter);
app.use('/projects', projectsRouter);

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
  res.render('error');
});

module.exports = app;

function dbConnection() {
  console.log("Attempting to connect to mongo...");
  mongoose
    .connect(dbUri(), {
      useNewUrlParser: true
    })
    .then(console.log("Connected to mongo"));
    const db = mongoose.connection;
    db.on("error", err => log.error("DB connection error: %s", err));
}

function dbUri() {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI env var is not set, cannot connect to Mongo");
  }
  return process.env.MONGODB_URI;
}

function errorHandler(err, req, res, next) {
  const { status, responseBody } = handleError(err);
  res.status(status).json(responseBody);
}