const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const {
  sequelize
} = require('./models');
const cors = require('cors');

sequelize.sync({})
  .then(() => {
    console.log('데이터베이스 연결 성공.');
  })
  .catch((error) => {
    console.error(error);
  })

const indexRouter = require('./routes/index');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(logger(":method"), function (req, res, next) {
  next();
});

app.use(logger(":url"), function (req, res, next) {
  next();
});
app.use(logger(":status"), function (req, res, next) {
  next();
});
app.use(logger(":response-time"), function (req, res, next) {
  next();
});





app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

module.exports = app;