const SQLITE3 = require("sqlite3").verbose();
const fs = require('fs');
const MYHELPERS = require("../myhelpers.js");
const waitingAccounts = './waitingAccounts/waitingAccounts.db';
const adminadminLogins = '../sharedDB/adminLogins.db';
const scheduleFile = '../sharedDB/scheduleFile.db';
const CONFIG = require('../config.js');
const HOMEURL = CONFIG.HOMEURL;
const MYDBSTUFF = require('../mydbstuff.js');
const PATH = require('path');
const BCRYPT = require('bcryptjs');


/**
	Route for activation from email registration.
	Checks token for the account in the database and... 
	PROVIDES A FORM FOR THE EMPLOYEE TO SET A PASSWORD. 
*/
function doActivation( req, res ) { 
	function successful() {
		var viewPath = PATH.join(__dirname, '../', 'public',  'employeeActivation.ejs');		      
		var TPL = {
			theToken: givenToken
		};
		res.render(viewPath, TPL );      
	}
	function Notsuccesful() {
		var viewPath = PATH.join(__dirname, '../', 'public', 'unsuccesfulActivation.ejs');				
		var TPL = { route: HOMEURL };	
		res.render(viewPath, TPL );					
	}
	var lru = req.url;
	var givenToken = lru.replace(/\/doActivation\//, '');  
	if( MYHELPERS.validateToken(givenToken) ){		
		var SELECTSTATEMENT = "SELECT * FROM waitingAccounts WHERE token = '"+givenToken+"';";	        
		var	db = new SQLITE3.Database(waitingAccounts);
		db.all(SELECTSTATEMENT,  (err, rows ) => {	
			if (err) {
				console.log("error at get /db.run Select  ");
				throw err; 
			}				            
			db.close();      
			if(rows.length == 1 ) {
				var id = rows[0]['id'];
				var passer = rows[0]['passer'];
				var email = rows[0]['email'];
				var salt = rows[0]['salt'];      
				var now = new Date();
				var ex = rows[0]['expires'];
				var expires = new Date(ex);
				if ( now > expires ) {          
					Notsuccesful();
				}else{                
					successful();
				}
			} else{        
				Notsuccesful();
			}
		});
	} else {
		Notsuccesful();
	}
	MYDBSTUFF.removeOldtokens();
}////End of When activation is requested




/// doActivation of employee account.
function doEmployeeActivation(req, res) { 	
	var input = req.body;  
	var Given_Password = input.P;
	var Given_Token = input.T;
	function handleErrorResponse(){
		res.send("COMPUTER ERROR"); 		     
	}  	
	function handleSuccessResponse() {
		res.send("ACCOUNT ACTIVATED"); 		     
	}
	if(MYHELPERS.validatepassword(Given_Password)){   
		if(MYHELPERS.validateToken(Given_Token)){
			var db = new SQLITE3.Database( waitingAccounts );            
			db.get('SELECT * FROM waitingAccounts WHERE token = "'+Given_Token+'";', (err, rows ) => {        
				if(err) { 
					console.log(err); 
					handleErrorResponse();
				} else {
					var email, firstname, lastname, L, I, H, S;  
					email = rows.email;  
					firstname = rows.firstname;
					lastname = rows.lastname;
					var certarr = rows.certarr;
					certarr = JSON.parse(certarr);                
					L = certarr[0]; I = certarr[1];
					H = certarr[2]; S = certarr[3];           
					
					function createEmployeeInScheduleFile(firstname, lastname, L, I, H, S){
						var sche_db = new SQLITE3.Database( scheduleFile );                 
						var Availability = { Sunday: "", Monday: "", Tuesday: "", Wednesday: "", Thrusday: "", Friday: "", Saturday: "", Generalnote: "" };
						var json_AV = JSON.stringify(Availability);
						var instertStatement = "INSERT INTO Employees ( Firstname, Lastname, instructor, lifeguard, headguard, supervisor, Availability ) VALUES (  \""+firstname+"\",  \""+lastname+"\",  \""+L+"\",  \""+I+"\",  \""+H+"\",  \""+S+"\", '"+json_AV+"' );";
						sche_db.run(instertStatement, (err) => {
							if(err) { console.log(err); 
								handleErrorResponse(); 		
							}else{                
								handleSuccessResponse();		
							}
						});                      
					}
					
					var emp_db = new SQLITE3.Database( adminadminLogins );             
					DoInserton( email, Given_Password, false, null, emp_db   );                          					
					function DoInserton( email, pa, secondLoop, saltyBit, db  ) {
						if( secondLoop == false){ 
							BCRYPT.genSalt(10, function(err, salt) {  
								if(err) { 
									handleErrorResponse(); 		
								}else{                                  
									BCRYPT.hash(pa, salt, function(err, hash) {
										if(err){  
											handleErrorResponse();		
										}else{                  
											DoInserton(  email, hash, true, salt, db );
										}           
									});                  
								}                  
							});
						} else {								
							var INSERTstatement = "INSERT INTO adminLogins ( id, Firstname, Lastname, email,  password, salt   ) values ( null, \""+firstname+"\", \""+lastname+"\",  \""+email+"\", \""+pa+"\", \""+saltyBit+"\"  )";							              
							db.run( INSERTstatement );	
							db.close();		
							createEmployeeInScheduleFile(firstname, lastname, L, I, H, S);            
						}
					}
				}
			});
		}else{      
			handleErrorResponse();
		}   
	}else{
		handleErrorResponse()	
	}
	MYDBSTUFF.removeOldtokens();     
} 



var Activation = {
  doActivation:doActivation,
  doEmployeeActivation:doEmployeeActivation
}



module.exports = Activation;