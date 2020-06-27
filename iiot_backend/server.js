console.log(" Start backend sever.js for IIOT website. ");
require('dotenv').config();
const FLASH = require('connect-flash');
const PASSPORT = require('passport');
const LOCALSTRATEGY = require('passport-local').Strategy;
const EXPRESS = require('express');
const PORT = 3005;
const SQLITE3 = require("sqlite3").verbose();
const EXPRESSVALIDATOR = require('express-validator');
const SESSION = require('express-session');
const BODYPARSER = require('body-parser');
const COOKIEPARSER = require('cookie-parser');
const BCRYPT = require('bcryptjs');
const MYDBSTUFF = require('./mydbstuff.js');//// Put the database stuff in a module.
MYDBSTUFF.plzdomydbsetup(); //// Run Database Set up.
const adminLogins = MYDBSTUFF.adminLogins;
const handleEvents = require('./handleEvents.js');
handleEvents.Setup();
const REGULARROUTES = require('./routes/regularroutes');

/** Express App Setup and MiddleWare stuff. */
const APP = EXPRESS();
APP.set('view engine','ejs');
APP.use(FLASH());
APP.use(SESSION({  secret: 'secret',  saveUninitialized: true,  resave: true	}));
APP.use(PASSPORT.initialize());
APP.use(PASSPORT.session());
APP.use(EXPRESSVALIDATOR());
APP.use(BODYPARSER.json( {limit: '5mb' }));
APP.use(BODYPARSER.urlencoded({ extended: false}));
APP.use(COOKIEPARSER());
APP.use(function(req, res, next) {
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	res.locals.Given_Email = req.flash('Given_Email');
	res.locals.user = req.user || null;
	next();
});
APP.listen(PORT); 









PASSPORT.use(new LOCALSTRATEGY(function(Given_Email, Given_Password, done) {
	var db = new SQLITE3.Database(MYDBSTUFF.adminLoginsfile);
	db.get('SELECT salt, Password, Email, id FROM adminLogins WHERE Email = ?', Given_Email, function(err, row) {
		if (!row) { return done(null, false, {message:"Unknown User"}); }
		var storedPassword = row.Password; var candidatePassword = Given_Password;
		BCRYPT.compare(candidatePassword, storedPassword, function(err, isMatch) {
			if(err) {
				console.error("error at passport use bycrypt. compare ");
				throw err;
			}
			if (!isMatch)
			{  return done(null, false, { message:"Invalid Password" }); }
			else
			{ return done(null, row); }
    });	
  });	
})); 
PASSPORT.serializeUser(function(employee, done) { 
  return done(null, employee.id); 
}); 
PASSPORT.deserializeUser(function(id, done) {
	var db = new SQLITE3.Database(MYDBSTUFF.adminLoginsfile);
	db.get('SELECT id, Email, Firstname, Lastname FROM adminLogins WHERE id = ?', id, function(err, row) {
		if (!row){ return done(null, false); }
		return done(null, row);
  }); 
});


 
//// All routing goes threw REGULARROUTES file.
APP.use('/', REGULARROUTES);



