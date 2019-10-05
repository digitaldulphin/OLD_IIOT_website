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

 

//// Put the database stuff in a module.
const MYDBSTUFF = require('./mydbstuff.js');
MYDBSTUFF.plzdomydbsetup();
 
const adminLogins = MYDBSTUFF.adminLogins;

const handleEvents = require('./handleEvents.js');
handleEvents.Setup();


const REGULARROUTES = require('./routes/regularroutes');




/** Express App Setup and MiddleWare stuff. */
const app = EXPRESS();

app.set('view engine','ejs');
app.use(FLASH());
app.use(SESSION({  secret: 'secret',  saveUninitialized: true,  resave: true	}));
app.use(PASSPORT.initialize());
app.use(PASSPORT.session());
app.use(EXPRESSVALIDATOR());
app.use(BODYPARSER.json( {limit: '5mb' }));
app.use(BODYPARSER.urlencoded({ extended: false}));
app.use(COOKIEPARSER());
app.use(function(req, res, next) {
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	res.locals.Given_Email = req.flash('Given_Email');
	res.locals.user = req.user || null;
	next();
});
app.listen(PORT); 









PASSPORT.use(new LOCALSTRATEGY(function(Given_Email, Given_Password, done) {
	var db = new SQLITE3.Database(MYDBSTUFF.adminLoginsfile);
	db.get('SELECT salt, Password, Email, id FROM adminLogins WHERE Email = ?', Given_Email, function(err, row) {
		if (!row) { return done(null, false, {message:"Unknown User"}); }
		var storedPassword = row.Password; var candidatePassword = Given_Password;
		BCRYPT.compare(candidatePassword, storedPassword, function(err, isMatch) {
			if(err) {
				console.log("error at passport use bycrypt. compare ");
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


 
//// middle ware for route files.
app.use('/', REGULARROUTES);



