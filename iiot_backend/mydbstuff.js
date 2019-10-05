const sqlite3 = require("sqlite3").verbose();
const fs = require('fs');
const BCRYPT = require('bcryptjs');
const MYHELPERS = require('./myhelpers.js');
 
const  adminLoginsfile   = './admins/adminLogins.db';
const waitingAccounts      = './waitingAccounts/waitingAccounts.db';
  

function plzdomydbsetup(  ) {
	/** 
	 * Create Database for employee Logins.
	 * 
	 */
	 
	fs.access(adminLoginsfile, fs.constants.R_OK | fs.constants.W_OK, (err) => {
		if(!err)  { console.log(' Database adminLogins exists going to delete now. ');
			fs.unlink(adminLoginsfile, (err) => { if (err) { console.log("Failed to delete database:"+err); } });
		} else { console.log(' Database adminLogins does not exist...'); }
		var db = new sqlite3.Database(adminLoginsfile);
		db.serialize(function() {
			///** Begin running sql statements to create DB for Editor Accounts. 
			var DROPtableStatement= "DROP TABLE IF EXISTS adminLogins;";
			db.run(DROPtableStatement);
			var CREATEtableStatement = "CREATE TABLE adminLogins (id INTEGER PRIMARY KEY AUTOINCREMENT, Firstname TEXT, Lastname TEXT, email TEXT, Password TEXT, salt TEXT)";
			db.run(CREATEtableStatement);
			console.log(" Database created.");
			///** Need to use a recusive method to insert a record in to Editor Accounts because the password needs to be converted into a hashed password.  
			var Firstname = "Norman"; var Lastname = "Potts"; var email = "storminnormanpotts@hotmail.com"; var password  = "12341234";
			try { DoInsertonEditorDB( Firstname, Lastname, email, password, false, null, db  ); }catch(e)	{ console.log(e);  }
		});
		function DoInsertonEditorDB( Firstname, Lastname, email,  password, secondLoop, saltyBit, db ) {
			if( secondLoop == false){
			BCRYPT.genSalt(10, function(err, salt) {  BCRYPT.hash(password, salt, function(err, hash) {
				DoInsertonEditorDB(Firstname, Lastname, email, hash, true, salt, db );
			}); });
			} else {
				var INSERTstatement = "INSERT INTO adminLogins ( id, Firstname, Lastname, email, password, salt ) values ( null, \""+Firstname+"\",  \""+Lastname+"\",  \""+email+"\", \""+password+"\", \""+saltyBit+"\" )";
				db.run( INSERTstatement );
				db.close();
			}
		}//// End of Function DoInsertonadminLogins.
	});//// End of setup for editorDB.
	  




	/** On start up, set up waitingAccounts database. 
	 *  The waitingAccounts database is for accounts that have just been submitted threw the sign up, and are waiting to be activated. 
	 *  Once activated accounts are deleted.
	 *  Currently deleted on start up.
	 */
	fs.access(waitingAccounts, fs.constants.R_OK | fs.constants.W_OK, (err) => { 
		if(!err)  { console.log(' Database waitingAccounts exists going to delete now. ');
			fs.unlink(waitingAccounts, (err) => { if (err) { console.log("Failed to delete database:"+err); }}); ////Do db delete waitingAccounts.
		} else { console.log(' Database waitingAccounts does not exist...'); }
		
		var db = new sqlite3.Database(waitingAccounts);
		db.serialize(function() {
			db.run("DROP TABLE IF EXISTS waitingAccounts;");
			db.run("CREATE TABLE waitingAccounts (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT,  firstname TEXT, lastname TEXT, certarr TEXT, token TEXT, expires TEXT );");	
			console.log(" Database created.");
		});	 	 
	});//// End of waitingAccounts database creation.
	  

}/////////End of function plzdomydbsetup


//// function that removes old tokens from waitingAccounts. Old as in older than their 'expire' date.
function removeOldtokens() { console.log('removeOldtokens');
  var SELECTSTATEMENT = "SELECT * FROM waitingAccounts;";	
	db = new sqlite3.Database(waitingAccounts);   		
	db.all(SELECTSTATEMENT,[],(err, rows ) => {	if (err) { console.log("error at get /db.all Select  "); throw err; }	
    db.close();
    var now = new Date();  var toremove = [];
    if ( rows.length > 0) {
      for(var i =0; i < rows.length; i++) {          
        var ex = rows[i]['expires'];
        var expires = new Date(ex);
        if ( now > expires ) {
          var id = rows[i]['id'];
          toremove.push(id);
        }        
      }
      if( toremove.length > 0) {
        var odis = toremove.join(" , ");
        db = new sqlite3.Database(waitingAccounts);   					
        db.serialize(function() {        
          var deleteStatement = "DELETE FROM waitingAccounts WHERE id IN ( "+odis+" );";			          
          db.run(deleteStatement);								
          db.close();          
        });
      }
    }
  });
}//// End of Function removeOldtokens.

 


var mydbstuff = {
   plzdomydbsetup:plzdomydbsetup,
   removeOldtokens:removeOldtokens,
   adminLoginsfile:adminLoginsfile,
   waitingAccounts:waitingAccounts 
}




module.exports = mydbstuff;