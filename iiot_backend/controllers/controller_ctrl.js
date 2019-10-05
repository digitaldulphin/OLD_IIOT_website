

const SQLITE3 = require("sqlite3").verbose();
const fs = require('fs');
const MYHELPERS = require("../myhelpers.js");
const waitingAccounts = './waitingAccounts/waitingAccounts.db';
const EMPLOYEELOGINFILE = '../sharedDB/adminLogins.db';
const SCHEDULEFILE = '../sharedDB/scheduleFile.db';
const CONFIG = require('../config.js');
const HOMEURL = CONFIG.HOMEURL; 

const MYSQLTIMEARRAY = MYHELPERS.mysqlTimeArray;
const MAKEYYYYMMDDWITHDATE = MYHELPERS.makeYYYMMDDwithDate;
const SHUFFLE = MYHELPERS.shuffle;
const MYSWITCHSHIFTTYPE = MYHELPERS.mySwitchShifType;		
const CONVERDISPLAYDATETOYYYMMDD = MYHELPERS.converDisplayDateToYYYMMDD; 



function reloadEmployeeSelectBox(req, res){
	var input = req.header('jsonInput');
	try {
		var arr = JSON.parse(input); 
		var yyyymmdd = arr['yyyymmdd']; var StartTime = arr['StartTime']; var EndTime = arr['EndTime']; var ShiftType = arr['ShiftType'];		
		var patternDate = /^\d\d\d\d-\d\d-\d\d$/; 
		var dateCheck = patternDate.test(yyyymmdd);
		var patternST = /^\d\d:\d\d:\d\d$/;	
		var stCheck  = patternST.test(StartTime);					
		var patternET = /^\d\d:\d\d:\d\d$/;	
		var etCheck  = patternET.test(EndTime);					
		var patternShiftType = /^[1-4]{1}$/;
		var shiftTypeCheck = patternShiftType.test(ShiftType);					
		if ( dateCheck == false || stCheck == false || etCheck == false || shiftTypeCheck == false ) {
			console.log(" Inncorect data recived, Should have been correct... here: "+yyyymmdd+" "+StartTime+" "+EndTime+" "+ShiftType+" ");
			res.send('COMPUTER ERROR'); 
		} else {				
			var st = MYSQLTIMEARRAY.indexOf(StartTime);	var et = MYSQLTIMEARRAY.indexOf(EndTime);
			determineWhoCanWork( null, ShiftType, yyyymmdd, st, et, handleResponse, req, res);				
			function handleResponse(employeeArr)  {
				res.send(employeeArr); 
			}																	
		}/// End of if else.		
	} catch(e) {		
		console.error("unexpected error in func reloadEmployeeSelectBox/ \n Error:  "+e);		
		res.send('COMPUTER ERROR'); 		
	}
}//// End function reloadEmployeeSelectBox. 



function getEmployeeArray( req, res ) {
	var instructions = [];
	instructions.push(1);
	try {
		var db = new SQLITE3.Database(SCHEDULEFILE);
		var SELECTSTATEMENT = 'SELECT * FROM Employees;'; 
		db.all(SELECTSTATEMENT, (err, rows) => {
			if(err == null) {
				instructions[0] = 2;
				instructions.push(rows); 
				res.send(instructions);		
			}else{
				console.log('Error in /getEmployeeArray, after db '+err);
				res.send(instructions);	
			}					
		});
	}catch(e) {
		console.log('Error in /getEmployeeArray! '+e);
		res.send(instructions);	
	}
}




function getAvailabilityArr( req, res) {
    var instructions = [];	
	var input = req.header('jsonInput');
	try {
		var arr = JSON.parse(input);
		var eID = arr[0];
		function checkID(n)  {						
			var pattern = /^[0-9]{1,10}$/; //// must be yyyy-mm-dd format.
			var check = false;
			check = pattern.test(n);	
			return check;		
		}
		var safe = checkID(eID);
		if( safe ) {
			var SELECTSTATEMENT = "SELECT Availability FROM Employees WHERE id = "+eID+";";	
			var db = new SQLITE3.Database(SCHEDULEFILE);   		
			db.all(SELECTSTATEMENT,[],(err, employee ) => {	if (err) { console.log("error at get /db.all Select  "); throw err; }	
				var avail = employee[0]["Availability"];
				employee[0]["Availability"] = JSON.parse(avail);				
				var strArr = JSON.stringify(employee);
				instructions.push(1);
				instructions.push(strArr);				
				var Jstrinstr = JSON.stringify(instructions);
				res.send(Jstrinstr); 					
			});	
		}else{
			/// TherequestUsername did not match the recivedUsername.  Must be inncorrect Criedentals.
			instructions.push(3);
			var Jstrinstr = JSON.stringify(instructions);
			res.send(Jstrinstr); 		
		}				
	}catch(e) {
		console.log("There was an error in /Editor/GiveShiftToEmployee error:"+e);
		instructions.push(4);
		var Jstrinstr = JSON.stringify(instructions);
		res.send(instructions);
	}
} 




function setAvailability( req, res ) {
	var instructions = [];	
	var input = req.header('jsonInput');
	try {
		var arr = JSON.parse(input);
		var eID = arr[0];
		var Availability = arr[1];
		function checkID(n)  {						
			var pattern = /^[0-9]{1,10}$/; //// must be yyyy-mm-dd format.
			var check = false;
			check = pattern.test(n);	
			return check;		
		}
		var safe = checkID(eID);
		function checkAvailability(n)  {						
			var pattern = /^[0-9]{1,10}$/; //// must be yyyy-mm-dd format.
			var check = false;
			check = pattern.test(n);	
			return check;		
		}		
		function checkAvailability(n) {
			var check = true;
			return check;
		}
		var ID_safe = checkID(eID);
		var Avail_safe = checkAvailability(Availability)
		if( ID_safe == true && Avail_safe == true) {
			var str_avail = JSON.stringify(Availability);
			var UpdateStatement = "UPDATE Employees SET Availability = '"+str_avail+"'  WHERE id = "+eID+";";
			var db = new SQLITE3.Database(SCHEDULEFILE);   					
			db.run(UpdateStatement, [], function(err) {
				if (err) { return console.error(err.message); }											
				instructions.push(1);
				var Jstrinstr = JSON.stringify(instructions);
				res.send(Jstrinstr); 		
			});	
			db.close();						
		}else{
			/// TherequestUsername did not match the recivedUsername.  Must be inncorrect Criedentals.
			instructions.push(3);
			var Jstrinstr = JSON.stringify(instructions);
			res.send(Jstrinstr); 		
		}				
	}catch(e) {
		console.log("There was an error in /Editor/GiveShiftToEmployee error:"+e);
		instructions.push(4);
		var Jstrinstr = JSON.stringify(instructions);
		res.send(instructions);
	}

} 




function doEmployeeUpdate( req, res ) {  console.log("\n function doEmployeeUpdate \n");
    var instructions = []; //// instructions to send back to front end.
	var input = req.header('jsonInput');
	try {	
		var Inputarr =  JSON.parse(input);			
		var rID = Inputarr["id"];
		var rFirstname = Inputarr["firstname"];
		var rLastname = Inputarr["lastname"];
		var lif = ( Inputarr["lifeguard"] ) ? 1: 0;
		var ins = ( Inputarr["instructor"] ) ? 1:0;
		var hea = ( Inputarr["headguard"] ) ? 1: 0;
		var sup = ( Inputarr["supervisor"] ) ? 1:0;
		function checkName( n ) {
			var pattern = /^[A-Z]{1}[a-z]{1,20}$/; //// must be yyyy-mm-dd format.
			var check = false;
			check = pattern.test(n);	
			return check;			
		}
		var fchk = checkName(rFirstname); 
		var lchk = checkName(rLastname);
		function checkID(n)  {						
			var pattern = /^[0-9]{1,10}$/; //// must be yyyy-mm-dd format.
			var check = false;
			check = pattern.test(n);	
			return check;		
		}
		var ichk = checkID(rID);
	 	if ( fchk == true &&  lchk == true && ichk == true )
		{
////  Firstname, Lastname, instructor, lifeguard, headguard, supervisor, Availability		
			var db = new SQLITE3.Database(SCHEDULEFILE);
			var UpdateStatement = "UPDATE Employees SET Firstname = '"+rFirstname+"', Lastname = '"+rLastname+"', instructor = "+ins+", lifeguard = "+lif+", headguard = "+hea+", supervisor = "+sup+" WHERE id = "+rID+";";
			console.log(UpdateStatement);
			db.run(UpdateStatement, [], function(err) {
				if (err) { return console.error(err.message); }											
				var SELECTSTATEMENT = "SELECT id, Firstname, Lastname, instructor, lifeguard, headguard, supervisor  FROM Employees;";	
				db = new SQLITE3.Database(SCHEDULEFILE);   		
				db.all(SELECTSTATEMENT,[],(err, employees ) => {	if (err) { console.log("error at get /db.all Select  "); throw err; }	
					var strArr = JSON.stringify(employees);
					db.close();
					instructions.push(5);
					instructions.push(strArr);					
					var Jstrinstr = JSON.stringify(instructions);
					res.send(Jstrinstr); 			
				});			
			});	
			db.close();
		} else {
			instructions.push(6);
			var Jstrinstr = JSON.stringify(instructions);
			res.send(Jstrinstr); 		
		}
	} catch(e) {
		console.log("There was an error in /Editor/doEmployeeUpdate error: "+e);		
		instructions.push(4);
		var Jstrinstr = JSON.stringify(instructions);
		res.send(Jstrinstr); 		
	}		

} 




function doCreateEmployee( req, res ) {
	var instructions = []; //// instructions to send back to front end.
	instructions.push(1);  
	var input = req.body;
	instructions.push({ firstname: '', lastname: '', certs: '', email: '', general: '', input: input});
	try {		
		//// Assign input to variables.
		var rFirstname, rLastname, rCertArr; 	
		var L, I, H, S;
		rFirstname = input["Firstname"]; rLastname = input["Lastname"];
		rCertArr = input["CertArr"];  rEmail = input["Email"]
		L = rCertArr[0];  I = rCertArr[1];  H = rCertArr[2];  S = rCertArr[3];
		function checkCertArr( nr ) {
			/// Check entire CertArr for valid input data. 0  or 1.
			var check = true;
			var i = 0;
			do {
				if(!(nr[i]  === 0 || nr[i] === 1)) {         
					check = false;
					break;
				}
				i++;
			}while( i < 3);
			return check;			
		}//// End function checkCertArr    
		var RctrsOkay = checkCertArr(rCertArr);
		var checkName = /^[A-Z]{1}[a-z]{1,20}$/;
		var fchk = checkName.test(rFirstname); 
		var lchk = checkName.test(rLastname);
		var emailcheck = MYHELPERS.validateEmail(rEmail);
		if ( fchk == true &&  lchk == true && RctrsOkay == true && emailcheck == true)
		{		
			/** Have to check DB for matching first and last name.
			    Have to check DB for matching email.
			    IF the above okay, Have to send a email to the email and 
			    place the account in a waiting table.
			    Once the account has been activated by the employee threw email
			    The supervisor will beable assign shifts to the employee.
			    The activation link will only be live for 30 mins.		
                  3 Possibilies of things to do.
                  1. Real error to handle.
                    ^^^ Unexpected computer errors. show error screen.
                  2. Unacceptable firstname, lastname, or email.
                    ^^^ Stuff like account already exists, account has same email, email did not deliver...
                  3. Show success with 'okaydokie' button.  <-- That means hide
                   the form and say "Employee was created, now just waiting for
                   them to activate their account in their email." When click
                   the okaydokie button, the form appears again
            */
			function alreadyInDatabase(type) {
				if(type === 1) {   
					instructions[0] = 2;
					instructions[1].fb_general =  "An account has already been created with that same name or email. The account is waiting to be activated.";          
					var Jstrinstr = JSON.stringify(instructions);
					res.send(Jstrinstr); 		                  
				} else {
					instructions[0] = 2;
					instructions[1].fb_general = "An employee already exists in the system with that same name, or email.";          
					var Jstrinstr = JSON.stringify(instructions);
					res.send(Jstrinstr); 		                  
				}        
			}//// End Function alreadyInDatabase
			//// Does firstname and last name already exist?
			//// Check waiting accounts first then employee logins.
			var SELECTSTATEMENT = 'SELECT firstname, lastname from waitingAccounts WHERE firstname = "'+rFirstname+'" and lastname = "'+rLastname+'" Or email = "'+rEmail+'"; ';            
			var waitAcc_db = new SQLITE3.Database(waitingAccounts);			
			waitAcc_db.get(SELECTSTATEMENT, (err, row) => { 
				waitAcc_db.close();
				if (err) { 
					console.error('err at waitAcc_db.get, SELECT err: '+err);
				} else {
					if ( row ) {
						/// Already some one in database.        
						alreadyInDatabase(1);/// someone with the same name or email is already in the waiting accounts db.
					} else {
						/// Now check employee logins
						var adminLogins_db = new SQLITE3.Database(EMPLOYEELOGINFILE);  
						SELECTSTATEMENT = 'SELECT firstname, lastname from adminLogins WHERE firstname = "'+rFirstname+'" and lastname = "'+rLastname+'" Or email = "'+rEmail+'"; ';      
						adminLogins_db.get(SELECTSTATEMENT, (err, row) => { 
							if (err) { console.log(' At select match for employeeserr: '+err);  }
							if ( row ) {
								/// Already some one in database.          
								alreadyInDatabase(2); /// Someone with the same name or email is already in the employee database.
							}else{              
								/// Now send email with activation link. Place the account into the waiting table.
								sendAccountActivationLink( rEmail, rFirstname, rLastname, rCertArr, afterAccountActivation, res );
								function afterAccountActivation(err, res){
									if(err) {
										/// real err     
										console.log('error at afterAccountActivation err:'+err);
										instructions[0] = 1;
										var Jstrinstr = JSON.stringify(instructions);
										res.send(Jstrinstr); 		
									}else{
										/// success                
										instructions[0] = 3;
										var Jstrinstr = JSON.stringify(instructions);
										res.send(Jstrinstr); 		
									}                                                
								}//// End Function afterAccountActivation              
							}
						}); 
					}
				}
			}); 
		} else {			 
			instructions[0] = 2;
			//// Form data was inncorrect
			if (fchk == false) {
				instructions[1].fb_firstname = "Firstname must be letters only beginning with a captial. ";
			}
			if(lchk == false) {
				instructions[1].fb_lastname = "Lastname must be letters only beginning with a captial. ";
			}
			if( RctrsOkay == false) {
				instructions[1].fb_certs = "At least one employee role has to be choosen. ";
			}
			if( emailcheck == false) {
				instructions[1].fb_email = "Email must be a real email."; 
			}      
			var Jstrinstr = JSON.stringify(instructions);
			res.send(Jstrinstr); 		
			/*
				When instruction with 2 get sent back, an array is placed within the instructions array. 
				The first element says which feedback feild the message should go to.
				The second element is the message.
			*/ 
		}		    
	} catch(e) {
		console.log("There was an error in /controller/doCreateEmployee error: "+e);		
		instructions[0] = 1;
		var Jstrinstr = JSON.stringify(instructions);
		res.send(Jstrinstr); 		
	}
}/// End function doCreateEmployee 





function sendAccountActivationLink(G_Email, G_Firstname, G_Lastname, G_CertArr, cb, res ){  
	var nodemailer = require('nodemailer');
	var token = MYHELPERS.generateToken();
	/// create expiration date
	var exs = new Date();
	exs.setHours(exs.getHours() + 3);/// Actually 1 hours.
	var expires = exs.toISOString();        
	var kinl = HOMEURL+"activation/doActivation/"+token+"";
	console.log("token:"+token);
	var transporter = nodemailer.createTransport(  {
		service: "gmail",
		auth: { 
			user: 'myemailappjk@gmail.com',
			pass: 'esszxx@@SSaf56'
		}
	});
	var mailOptions = {
		from: 'myemailappjk@gmail.com', 
		to: G_Email,
		subject: "Employee Account Activation", 
		text: "Account activation for the schedule app.", 
		html: "<h3>Account Activation for this web app.</h3><a href = \""+kinl+"\" <h4>Click on this link to activate your account </h4></a> <h5> or copy and paste this link in your browser: "+kinl+" </5><p>This will expire in 30 minutes.</p>" // html body
	};                
	transporter.sendMail(mailOptions, function(err, info){     
		if (err) {  
			console.log(err);
			cb(err, res);      
		}else{      
			var jstr_certs = JSON.stringify( G_CertArr );
			var INSERTstatement = "INSERT INTO waitingAccounts ( id, email, firstname, lastname, certarr, token, expires ) values ( null, \""+G_Email+"\", \""+G_Firstname+"\", \""+G_Lastname+"\", \""+jstr_certs+"\",  \""+token+"\", \""+expires+"\" )";							
			var db = new SQLITE3.Database(waitingAccounts);
			db.run( INSERTstatement);
			db.close();
		}
	});
}/// End of function sendAccountActivationLink






























function GiveShiftToEmployee( req, res ) {
	
	function handleErrorResponse() {
		res.send("COMPUTER ERROR");
	}
	function handleSuccessResponse(data) {
		res.send(data);
	}
	
	var input = req.header('jsonInput');
	//console.log(input);
	try {
		var arr = JSON.parse(input);
		var eID = arr[0]; var ShiftID = arr[1];		
		function checkID(n)  {						
			var pattern = /^[0-9]{1,10}$/; //// must be yyyy-mm-dd format.
			var check = false;
			check = pattern.test(n);	
			return check;		
		}
		var chkID = checkID(eID);
		var chekShiftID = checkID(ShiftID);		
		if ( chkID == true && chekShiftID == true) {
			//// update shift set CurrentOwnerID to eID			
			var db = new SQLITE3.Database(SCHEDULEFILE);
			var UpdateStatement = "UPDATE Shifts SET CurrentOwnerID = '"+eID+"' WHERE ShiftID = "+ShiftID+";";
			db.run(UpdateStatement, [], function(err) {
				if (err) { 
					console.error(err.message);
					handleErrorResponse();
				}else{
					
					handleSuccessResponse("SUCCESSFULY GIVEN SHIFTS AWAY");	
				}
			});	
			db.close();
		}else{
			/// TherequestUsername did not match the recivedUsername.  Must be inncorrect Criedentals.
			handleErrorResponse();	
		}			
	}catch(e) {
		console.log("There was an error in /Controller/GiveShiftToEmployee error:"+e);
		handleErrorResponse();
	}

} 




function getEmployeeShifts( req, res ) {
    var id = req.query.id; 	
	function handleErrorResponse() {
		res.send('COMPUTER ERROR');
	}
	function handleSuccessResponse(data) {
		res.send(data);
	}
	try {
		if( MYHELPERS.isNumberic(id)){
			var eL = new SQLITE3.Database(EMPLOYEELOGINFILE);			
			var SELECTSTATEMENT = 'SELECT id, email, Firstname, Lastname FROM adminLogins WHERE id = ? ;'; 			
			eL.get(SELECTSTATEMENT, id, (err, employee) => {
				if(err == null) {											
					var db = new SQLITE3.Database(SCHEDULEFILE);
					var SELECTSTATEMENT = 'SELECT CurrentOwnerID, ShiftID, startTime, endTime, date, Position  FROM Shifts WHERE CurrentOwnerID = ? ;'; 
					db.all(SELECTSTATEMENT, id, (err, shifts) => {
						if(err == null) {
							employee.Shifts = shifts.map( (s) =>{
								var p = s.Position;
								s.Position = MYHELPERS.mySwitchPosition(p);
								return s;
							});						
							handleSuccessResponse(JSON.stringify(employee));
						}else{
							console.error(err.message);
							handleErrorResponse();
						}
					});
				}else{
					console.error(err.message);
					handleErrorResponse();
				}				
			});
		}else{
			console.log('Not Number !');
			handleErrorResponse();
		}
	} catch(e) {
		console.error(e.message);
		handleErrorResponse();
	}
} 




function getEmployeeShiftswhoCantakeshift( req, res ) {
	var input = req.header('jsonInput');
	function handleErrorResponse() {
		res.send("COMPUTER ERROR");
	}
	function handleSuccessRespons(employeeArr) {
		res.send(employeeArr);
	}
	try {
		//console.log(input);
		var Shift = JSON.parse(input);							
		var r_startTime, r_endTime, r_date, r_position, r_ShiftID, r_CurrentOwner;
		r_startTime = Shift["startTime"];
		r_endTime = Shift["endTime"];
		r_date = Shift["date"];
		r_Position = Shift["Position"];		
		r_CurrentOwner = Shift["CurrentOwnerID"];
				
		var st = r_startTime;
		var et = r_endTime;		
		var p = MYSWITCHSHIFTTYPE(r_Position);		
		var d = CONVERDISPLAYDATETOYYYMMDD(r_date); 

		var numbericPattern = /^[0-9]+$/;
		if(  numbericPattern.test(r_CurrentOwner) && numbericPattern.test(r_startTime)&& numbericPattern.test(r_endTime)){
			determineWhoCanWork( r_CurrentOwner, p, d, st, et, handleSuccessRespons, req, res );
		}else{
			console.log("There was an error in /getEmployeeShiftswhoCantakeshift error: "+e);		
			handleErrorResponse();
		}
	}catch(e) {
		console.log("There was an error in /getEmployeeShiftswhoCantakeshift error: "+e);		
		handleErrorResponse();			
	}
} 

 

 









 

/** function determineWhoCanWork
 * This function is used to fill the employee select box.
 *  	
 *  
 */
function determineWhoCanWork( ownerID, ShiftType, ymd, StartTime, EndTime, secondHandleResponse, req, res ){
	
	try {
		
		//console.log("ShiftType, ymd, StartTime, EndTime," + ShiftType+"  "+ymd+"  "+StartTime+"  "+EndTime);
		var selectedDate = new Date(""+ymd+"T00:00:00");
		var lastdayOfWeek;	var firstdayOfWeek;			
		var sDay = selectedDate.getDay();//// Get the day of week 0 being sunday, 6 being saturday.
		if(sDay == 0 ) /* if selected date is sunday */
		{
			firstdayOfWeek = new Date(""+ymd+"T00:00:00");
			lastdayOfWeek = new Date( selectedDate.setDate( firstdayOfWeek.getDate() + 6  ));				
		}
		else if(sDay == 6) /* If selectedDate is satuday */
		{
			lastdayOfWeek = new Date(""+ymd+"T00:00:00");
			firstdayOfWeek = new Date( selectedDate.setDate( lastdayOfWeek.getDate() - 6 ));
		}
		else /* selected date is not sunday or saturday. */
		{				
			firstdayOfWeek = new Date( selectedDate.setDate( selectedDate.getDate() - (sDay)));
			lastdayOfWeek = new Date( selectedDate.setDate( firstdayOfWeek.getDate() + 6  ));
		}			
		var Sunday_yyyymmdd = MAKEYYYYMMDDWITHDATE( firstdayOfWeek );
		var Saturday_yyyymmdd = MAKEYYYYMMDDWITHDATE( lastdayOfWeek );
		//// Saturday_yyyymmdd and Sunday_yyyymmdd are ready.												
		//// set up query for shift type 
		var queryForShiftType ="";
		switch( ShiftType ) {
			case 1: queryForShiftType = "AND Lifeguard IS true"; break;
			case 2: queryForShiftType = "AND Instructor IS true"; break;
			case 3:	queryForShiftType = "AND Headguard IS true"; break;
			case 4:	queryForShiftType = "AND Supervisor IS true"; break;				
			default: queryForShiftType = " ";			
		}							
		//// id, Firstname, Lastname, instructor, lifeguard, headguard, supervisor, Availability
		//// CurrentOwnerID, startTime,  endTime, date, Position
		var SELECTSTATEMENT  = "SELECT Firstname, Lastname, id, Lifeguard, Instructor, Headguard, Supervisor, Availability  FROM Employees ";
		SELECTSTATEMENT += "WHERE id != '"+ownerID+"' AND id NOT IN( SELECT CurrentOwnerID  FROM Shifts  WHERE date = '"+ymd+"' ";
		SELECTSTATEMENT += "AND ( startTime <= '"+StartTime+"' AND  '"+StartTime+"' < endTime OR endTime >  '"+StartTime+"' ";
		SELECTSTATEMENT += "AND '"+EndTime+"' >  startTime )) "+queryForShiftType+";";																	
		var ids =""; 
		db = new SQLITE3.Database(SCHEDULEFILE);   		
		db.all(SELECTSTATEMENT,[],(err, employees ) => {	
			if (err) { 
				console.error("error at get /db.all Select determineWhoCanWork :"+err);
				secondHandleResponse("COMPUTER ERROR");
				db.close();
			} else {	
				var emIDS = [];
				var emIDS = employees.map(function(value,index) { return value.id; });
				if( emIDS.length > 0 ) {
				ids = ""+emIDS[0];
					for( var i = 1; i < emIDS.length; i++ ){
						ids = ids+","+emIDS[i];
					}
				}
				db.close();
							
				//// Get the shifts between this week's dates  Saturday_yyyymmdd and Sunday_yyyymmdd
				SELECTSTATEMENT = "SELECT CurrentOwnerID, startTime, endTime FROM Shifts";
				SELECTSTATEMENT += " WHERE  date >= '"+Sunday_yyyymmdd+"' AND   date <= '"+Saturday_yyyymmdd+"' AND CurrentOwnerID IN ("+ids+");";	
				db = new SQLITE3.Database(SCHEDULEFILE);   		
				db.all(SELECTSTATEMENT,[],(err, shiftsBetweenDates ) => {	
					if (err) { 
						console.error("error at SECOND db.all select func determineWhoCanWork: "+err);
						secondHandleResponse("COMPUTER ERROR");
						db.close();
					} else {
							
						var IDswithShifts = employees.map(function(value,index) { return value.CurrentOwnerID; });
						for( var i =0; i<employees.length; i++ ){
							var AV = employees[i].Availability;
							Availability = JSON.parse(AV);
							employees[i]["Availability"] = Availability;
							var DisEmployeeID = employees[i].id;
							var key = IDswithShifts.indexOf( DisEmployeeID );
							if (key == false ) {
								employees[i]["HoursThisWeek"] = 0;
							}else{
								var accumhours = 0;
								for( var j =0; j<shiftsBetweenDates.length; j++ ){
									if( DisEmployeeID ==  shiftsBetweenDates[j]["CurrentOwnerID"] )
									{ 
										var Shiftstart = shiftsBetweenDates[j]['startTime']; 
										var Shiftend = shiftsBetweenDates[j]['endTime'];
										var Sindex = MYSQLTIMEARRAY.indexOf( Shiftstart );
										var Eindex = MYSQLTIMEARRAY.indexOf( Shiftend );					
										accumhours +=  ( Eindex - Sindex ) /4;
									}														
								}
								employees[i]["HoursThisWeek"] = accumhours;
							}												
						}														
						db.close();					
						SHUFFLE(employees);				
						var employeeArr = JSON.stringify(employees);				
						secondHandleResponse(employeeArr);
					}
				});
			}
		});
	} catch( e ) {
		console.error('try catch error in determineWhoCanWork: '+e.message);
		secondHandleResponse('COMPUTER ERROR');
	}
}




function ByGivenDay(req, res) {
	var input = req.header('jsonInput');
	givenDate = input;
	//// Check for proper date string... 	
	var patternDate = /^\d\d\d\d-\d\d-\d\d$/; //// must be yyyy-mm-dd format.
	var dateCheck = false;
	dateCheck = patternDate.test(givenDate);			
	if ( dateCheck == false ) {  console.log(" Inncorect date recived, Should have been correct... here: "+givenDate);
		res.send('[]'); 
	} else {	
		function handleResponse( shiftsOnThatDay, req, res ) {  
			///console.log("ByGivenDay shiftsOnThatDay: "+shiftsOnThatDay);
			res.send(shiftsOnThatDay); 
		}			
		selectEmployeesWhoWorkOnGivenDay( givenDate, req, res, handleResponse );			
	}
	
}

/** selectEmployeesWhoWorkOnGivenDay
 * Preformes database query for the employees and their shifts on a given date. 
 * Has a recives a call back function for how the response should be handeled.
 */
function selectEmployeesWhoWorkOnGivenDay( yyyymmdd, req, res, handleResponse  ) { 
	var writeQuery = "SELECT e.Firstname, e.Lastname, e.id, s.startTime, s.endTime, s.date, s.Position, s.ShiftID FROM Shifts s LEFT JOIN Employees e ON e.id = s.CurrentOwnerID WHERE s.date = '"+yyyymmdd+"' ORDER BY e.id ASC;";		
	var db = new SQLITE3.Database(SCHEDULEFILE);   		
	db.all(writeQuery,[],(err, shifts ) => {	if (err) { console.log("error at get / "); throw err; }	
		var employees = [];	var emIDS = [];
		for( var i = 0; i < shifts.length; i++ ) { //// For each shift build an array of employees	.
			var empID = shifts[i].id;			
			if( emIDS.includes(empID) == false) { /* If the employee is not already in the array, add that employee. */
				var employee = {CurrentOwnerID: shifts[i].id, Firstname: shifts[i].Firstname,  Lastname: shifts[i].Lastname,  Shifts: [] };				
				employees.push( employee );
				emIDS.push(empID);
			}
		}		
		for( var i = 0; i < shifts.length; i++ ) { 	/* Now for every shift, add it to it's employee's shift array. */
			for( var j = 0; j < employees.length; j++ ) { 
				if (shifts[i].id ==  employees[j].CurrentOwnerID) {
					p = shifts[i].Position;
					var Pos;
					switch(p) {
						case 1: Pos = "Lifeguard";  break;						
						case 2: Pos = "Instructor"; break;						
						case 3: Pos = "Headguard";  break;						
						case 4: Pos = "Supervisor"; break;
					}					
					var s = MYSQLTIMEARRAY[ shifts[i].startTime ]; var e = MYSQLTIMEARRAY[ shifts[i].endTime ]; 					
					var shift = {  startTime:s, endTime:e, Position:Pos, ShiftID:shifts[i].ShiftID, st:shifts[i].startTime, et:shifts[i].endTime}					
					employees[j]["Shifts"].push(shift)	
				}			
			}					
		} //// The array with Employee's with their shifts today has been creaded.
		db.close();							
		/// Sort employees shifts by start time.
		for( var j = 0; j < employees.length; j++ ) {
			employees[j]["Shifts"].sort( function( a, b) { return a.st - b.st; });
		}
		/// Sort by first shift.			
		employees.sort( function( a, b) { return a["Shifts"][0].st - b["Shifts"][0].st; });		
		var shiftArrToday = JSON.stringify(employees);	
		handleResponse(shiftArrToday, req, res);		
	}); 	
}

function CreateTheShift( req, res ) {
	var input = req.header('jsonInput');	
	try {
		///console.log("input at Editor/CreateTheShift: "+input);
		var arr = JSON.parse(input);///// {"date":"2018-11-24","StartTime":"00:00:00","EndTime":"00:30:00","ShiftType":1,"ID":1}
		var yyyymmdd = arr['date']; var StartTime = arr['StartTime']; var EndTime = arr['EndTime']; var ShiftType = arr['ShiftType']; var eID = arr['ID'];			
		
		var patternDate = /^\d\d\d\d-\d\d-\d\d$/;
		var dateCheck = patternDate.test(yyyymmdd);			
		var patternST = /^\d\d:\d\d:\d\d$/;
		var stCheck  = patternST.test(StartTime);					
		var patternET = /^\d\d:\d\d:\d\d$/; 
		var etCheck  = patternET.test(EndTime);					
		var patternShiftType = /^[1-4]{1}$/;
		var shiftTypeCheck = patternShiftType.test(ShiftType);		
		var patternEmployeeID = /^[0-9]+$/; 
		var patternEmployeeIDCheck = patternEmployeeID.test(eID);			
		
		if ( dateCheck == false || stCheck == false || etCheck == false || shiftTypeCheck == false || patternEmployeeIDCheck == false ) {
			console.log(" Inncorect data recived, Should have been correct... here: "+yyyymmdd+" "+StartTime+" "+EndTime+" "+ShiftType+" "+eID);
			res.send("INNCORRECT DATA RECIVED!"); 
		} else {																	
			var st = MYSQLTIMEARRAY.indexOf(StartTime);
			var et = MYSQLTIMEARRAY.indexOf(EndTime);			
			var db = new SQLITE3.Database(SCHEDULEFILE);   					
			var instertStatement = "INSERT INTO Shifts ( CurrentOwnerID, startTime,  endTime, date, Position) VALUES ( "+eID+", "+st+", "+et+", '"+yyyymmdd+"', "+ShiftType+" );";
			db.run(instertStatement);				
			db.close();
			res.send("SHIFT CREATED"); 
			
		}		
	} catch(e) {
		console.log("There was an error in /Editor/CreatetheShift/ error: "+e);		
		res.send("INNCORRECT DATA RECIVED!"); 		
	}	
}//// End function CreateTheShift


function deleteShift(  req, res ) {
	var input = req.header('jsonInput');	
	try {
		var arr = JSON.parse(input);	
		var ShiftID = arr['ShiftID'];
		var patternShiftID = /^[0-9]+$/; 
		var ShiftIDCheck = patternShiftID.test(ShiftID);			
		if ( ShiftIDCheck == false ) {
			console.log(" Inncorect data recived, Should have been correct... here: "+ShiftID+" ");
			res.send("INNCORRECT DATA RECIVED!"); 
		} else {			
			var db = new SQLITE3.Database(SCHEDULEFILE);   					
			var deleteStatement = "DELETE FROM Shifts WHERE ShiftID = "+ShiftID+";";				
			db.run(deleteStatement);							
			db.close();
			res.send("SHIFT DELETED"); 
		}	
	} catch(e) {
		console.log("There was an error in /Editor/deleteShift/ error: "+e);		
		res.send("INNCORRECT DATA RECIVED!"); 		
	}		
}////End Function deleteShift





var controllers = {
 	getEmployeeArray:getEmployeeArray,
 	getAvailabilityArr:getAvailabilityArr,
 	setAvailability:setAvailability,
 	doEmployeeUpdate:doEmployeeUpdate,
 	doCreateEmployee:doCreateEmployee,
 	getEmployeeShifts:getEmployeeShifts,
	ByGivenDay:ByGivenDay,
	reloadEmployeeSelectBox:reloadEmployeeSelectBox,
	CreateTheShift:CreateTheShift,
	deleteShift:deleteShift,
	getEmployeeShiftswhoCantakeshift:getEmployeeShiftswhoCantakeshift,
	GiveShiftToEmployee:GiveShiftToEmployee
};


module.exports = controllers;
 