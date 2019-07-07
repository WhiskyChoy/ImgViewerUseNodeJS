let express = require('express');
let session = require('express-session');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let bodyParser = require('body-parser');
let sessionConfig = require('./session/session_config');

let app = express();

app.use(logger('dev'));
app.use(session(sessionConfig));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded

let indexRouter = require('./routes/router');
app.use(cookieParser());
app.use('/', indexRouter);
app.use(express.static(path.join(__dirname, 'public'),{index:"login.html"}));


module.exports = app;
