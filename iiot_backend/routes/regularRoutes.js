const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const PATH = require('path');
const CONFIG = require('../config.js');
const HOMEURL = CONFIG.HOMEURL;
const PASSPORT = require('passport');
const MYHELPERS = require('../myhelpers.js');
const GETTODAYYYMMDD = MYHELPERS.getTodayyyymmdd;
const GETDISPLAYDATEOFTODAY = MYHELPERS.getDisplayDateOfToday;
const CONTROLLERROUTES = require('./controllerRoutes');
const ACTIVATIONROUTES = require('./activationRoutes');


function ensureAuthenticated(req, res, next){ console.log("func ensureAuthenticated");
	if(req.isAuthenticated()) { return next(); }
	else {
		console.log("Ensure Authenticated 'not logged in.'")
		req.flash('error_msg','You are not logged in'); 
		res.redirect('/');
		
	}
}    




// Disabled Authentication for development. 
//ROUTER.use('/controller', ensureAuthenticated, CONTROLLERROUTES);
//ROUTER.all(/\/controller\/*/, ensureAuthenticated, CONTROLLERROUTES); 
ROUTER.use('/controller',  CONTROLLERROUTES);
ROUTER.all(/\/controller\/*/,   CONTROLLERROUTES); 


/// ACTIVATIONROUTES are for the reactivation of an admin account when they need to change their password.
ROUTER.use('/activation', ACTIVATIONROUTES);
ROUTER.all(/\/activation\/*/, ACTIVATIONROUTES); 




/**
 * 	Root. Redirects to controller when already authenticated. Displays login 
 *  page when not authenticated.
 */
ROUTER.get('/', function(req, res) { console.log(" get '/' ");
  if(req.isAuthenticated()) {
		res.redirect('/controller');
	} else {
    var yyyymmdd = GETTODAYYYMMDD(); var dayDate = GETDISPLAYDATEOFTODAY();
		var viewPath = PATH.join(__dirname, '../',  'public', 'login.ejs');
    var TPL = { route: HOMEURL, displayDate: dayDate, YYYYMMDD: yyyymmdd, shiftArrayForToday: [] };
    res.render(viewPath, TPL );
	}
});


/**	
 *  doLoginPlz	- does the actual login and authentication.
 * 	
 */
ROUTER.post('/doLoginPlz/', function(req, res, next) { console.log(" post /doLoginPlz/")
	PASSPORT.authenticate('local', function(err, user, info) {
		if (err) { return next(err); }
		if (!user) {
			var x = req.body.username;
			req.flash('Given_Email',x);
			req.flash('error', info.message);
			return res.redirect('/');
		}
		req.logIn(user, function(err) {
			if (err) { return next(err); }
			return res.redirect('/controller');
		});
	})(req, res, next);
});
ROUTER.get('/logout', function (req, res) { console.log(' get /logout');
	req.logout(); 
	req.flash('success_msg', 'You are logged out'); 
	res.redirect('/controller'); //// res.redirect('/logout'); 
});









/**
 * /GetInfo retrieves the AppData that is currently in the json file.
 *
 */
ROUTER.get('/GetInfo', (req, res) => { console.log('GET - /GetInfo')
	let AppData = require('../AppData.js');
	let jsonItem = JSON.stringify(AppData.readADfile());  
	res.send(jsonItem);
});
 









 

module.exports = ROUTER;