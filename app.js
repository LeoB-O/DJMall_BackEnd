const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const jwt = require('jwt-express');
const cors = require('cors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const apiRouter = require('./routes/api');
const credentials = require('./credentials');

const app = express();

mongoose.connect(credentials.mongo.development.connectionString)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(jwt.init(credentials.jwt.development.secret, credentials.jwt.development.options));
app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', jwt.active(), apiRouter);

app.use(function(err, req, res, next) {
    if (err.name == 'JWTExpressError') {
        // user is unauthorized
        res.status(401);
        res.render('401', {error: err});
    } else {
        next(err);
    }
});

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
    res.render('error');
});

module.exports = app;
