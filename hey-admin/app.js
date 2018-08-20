var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var routes = require('./routes/index');
var settings = require('./settings');
var flash = require('connect-flash');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use(session({
	secret: settings.cookieSecret,
	key: settings.db,//cookie name
	cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},//30 days
	store: new MongoStore({
		url: 'mongodb://localhost/blog'
		// db: settings.db,
		// host: settings.host,
		// port: settings.port
	})
}));

app.use(flash());
routes(app);
module.exports = app;
