console.log('server start');

const EXPRESS = require('express');
const PATH = require('path');
const fs = require('fs');
const COOKIEPARSER = require('cookie-parser');
const BODYPARSER = require('body-parser');
const EXPHBS = require('express-handlebars');
 



const APP = EXPRESS();


/// The View Engine.
APP.set('views', PATH.join(__dirname, 'views'));
APP.engine('handlebars', EXPHBS({defaultLayout: 'layouts'}));
APP.set('view engine', 'handlebars');



////Set Static Path to Public folder.
APP.use(EXPRESS.static(PATH.join(__dirname,'public')));





const PORT = 2048;
APP.listen(PORT);


APP.get('/', function(req,res) { 
    var TPL = { cssName: 'aboutus', abo: 'choosenPage' };
    res.render('aboutus', TPL );
   
});



APP.get('/Projects', function(req,res) { 
    var TPL = { cssName: 'projects', pro: 'choosenPage' };
    res.render('projects', TPL );
   
});




APP.get('/Blog', function(req,res) { 
    var TPL = { cssName: 'blog', blo:'choosenPage' };
    res.render('blog', TPL );
     
});




APP.get('/Events', function(req,res) { 
    var TPL = { cssName: 'events', eve:'choosenPage' };
    res.render('events', TPL );
     
});



//Project_1


APP.get('/Project_1', function(req,res) { 
    var TPL = { cssName: 'blog', pro:'choosenPage' };
    res.render('Projects/Project_1', TPL );
     
});

