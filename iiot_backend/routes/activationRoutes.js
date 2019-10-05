const EXPRESS = require('express');
const ROUTER = EXPRESS.Router(); 
const PATH = require('path');
const CONFIG = require('../config.js');
const HOMEURL = CONFIG.HOMEURL;
const MYHELPERS = require('../myhelpers.js');

const activation = require('../controllers/activation_ctrl.js');
 

ROUTER.get(/doActivation\/*/, function(req, res) {
	activation.doActivation( req, res );   
});


ROUTER.post('/doActivation', function (req, res) {  console.log(" post '/doActivation'  ");		
	activation.doActivation( req, res );
});

 

module.exports = ROUTER;