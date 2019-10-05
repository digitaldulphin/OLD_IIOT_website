

const CONFIG = require('./config.js');
const HOMEURL = CONFIG.HOMEURL;

const AMPM12HourArray = [ "12:00am", "12:15am", "12:30am", "12:45am", "1:00am", "1:15am", "1:30am", "1:45am", "2:00am", "2:15am", "2:30am", "2:45am", "3:00am", "3:15am", "3:30am", "3:45am", "4:00am", "4:15am", "4:30am", "4:45am", "5:00am", "5:15am", "5:30am", "5:45am", "6:00am", "6:15am", "6:30am", "6:45am", "7:00am", "7:15am", "7:30am", "7:45am", "8:00am", "8:15am", "8:30am", "8:45am", "9:00am", "9:15am", "9:30am", "9:45am", "10:00am", "10:15am", "10:30am", "10:45am", "11:00am", "11:15am", "11:30am", "11:45am", "12:00pm", "12:15pm", "12:30pm", "12:45pm", "1:00pm", "1:15pm", "1:30pm", "1:45pm", "2:00pm", "2:15pm", "2:30pm", "2:45pm", "3:00pm", "3:15pm", "3:30pm", "3:45pm", "4:00pm", "4:15pm", "4:30pm", "4:45pm", "5:00pm", "5:15pm", "5:30pm", "5:45pm", "6:00pm", "6:15pm", "6:30pm", "6:45pm", "7:00pm", "7:15pm", "7:30pm", "7:45pm", "8:00pm", "8:15pm", "8:30pm", "8:45pm", "9:00pm", "9:30pm", "9:45pm", "10:00pm", "10:15pm", "10:30pm", "10:45pm", "11:00pm", "11:15pm", "11:30pm", "11:45pm" ];
const mysqlTimeArray =  [ "00:00:00", "00:15:00", "00:30:00", "00:45:00", "01:00:00", "01:15:00","01:30:00", "01:45:00", "02:00:00", "02:15:00", "02:30:00", "02:45:00", "03:00:00", "03:15:00","03:30:00", "03:45:00", "04:00:00", "04:15:00", "04:30:00", "04:45:00","05:00:00", "05:15:00", "05:30:00", "05:45:00", "06:00:00", "06:15:00", "06:30:00", "06:45:00", "07:00:00", "07:15:00", "07:30:00", "07:45:00", "08:00:00", "08:15:00", "08:30:00", "08:45:00","09:00:00", "09:15:00", "09:30:00", "09:45:00", "10:00:00", "10:15:00", "10:30:00", "10:45:00", "11:00:00", "11:15:00", "11:30:00", "11:45:00", "12:00:00", "12:15:00", "12:30:00", "12:45:00","13:00:00", "13:15:00", "13:30:00", "13:45:00", "14:00:00", "14:15:00", "14:30:00", "14:45:00", "15:00:00", "15:15:00", "15:30:00", "15:45:00", "16:00:00", "16:15:00", "16:30:00", "16:45:00", "17:00:00", "17:15:00", "17:30:00", "17:45:00", "18:00:00", "18:15:00", "18:30:00", "18:45:00", "19:00:00", "19:15:00", "19:30:00", "19:45:00", "20:00:00", "20:15:00", "20:30:00", "20:45:00","21:00:00", "21:15:00", "21:30:00", "21:45:00", "22:00:00", "22:15:00", "22:30:00", "22:45:00","23:00:00", "23:15:00", "23:30:00", "23:45:00" ];
const Arrmonths = ['January','February','March','April','May','June','July','August','September','October','November','December'];


function getTodayyyymmdd() {
	var todaysdate = new Date();
	var dd = todaysdate.getDate();
	var m = todaysdate.getMonth(); /* January is 0! */
	var yyyy = todaysdate.getFullYear()
	var mm = m+1;
	if(dd<10) {  dd = '0'+dd;  }
	if(mm<10) {  mm = '0'+mm;  }
	var yyyymmdd =  yyyy+"-"+mm+"-"+dd;
	return yyyymmdd;
}

function getDisplayDateOfToday() {
	var todaysdate = new Date();
	var dd = todaysdate.getDate();
	var m = todaysdate.getMonth(); //January is 0!
	var yyyy = todaysdate.getFullYear()
	var mm = m+1;
	if(dd<10) {  dd = '0'+dd;  }
	if(mm<10) {  mm = '0'+mm;  }
	var yyyymmdd =  yyyy+"-"+mm+"-"+dd;
	var today = yyyymmdd;
	var displaydate = ""+yyyy+"-"+Arrmonths[m]+"-"+dd;
	return displaydate;
}
////  Shuffles array in place.
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}
//// Creates a yyyy-mm-dd date with a given date.
function makeYYYMMDDwithDate( Le_date ) {
	var dd = Le_date.getDate();
	var m = Le_date.getMonth(); /* January is 0! */
	var yyyy = Le_date.getFullYear()
	var mm = m+1;
	if(dd<10) {  dd = '0'+dd;  }
	if(mm<10) {  mm = '0'+mm;  }
	var La_date =  yyyy+"-"+mm+"-"+dd;
	return La_date;
}
 
function getGivenDisplayDate( yyyymmdd ) {
	var todaysdate =  new Date(""+yyyymmdd+"T00:00:00");
	var dd = todaysdate.getDate();
	var m = todaysdate.getMonth(); //January is 0!
	var yyyy = todaysdate.getFullYear()
	var mm = m+1;
	if(dd<10) {  dd = '0'+dd;  }
	if(mm<10) {  mm = '0'+mm;  }
	var yyyymmdd =  yyyy+"-"+mm+"-"+dd;
	var today = yyyymmdd;
	var displaydate = ""+yyyy+"-"+Arrmonths[m]+"-"+dd;
	return displaydate;
}
function converDisplayDateToYYYMMDD( ddisplayddate ) {
	var arr = ddisplayddate.split("-");
	var month = arr[1];
	var m = Arrmonths.indexOf( month );
	m = m+1;
	if(m<10) {  m = '0'+m;  }
	var yyyymmdd =  arr[0]+"-"+m+"-"+arr[2];
	return yyyymmdd;
}
//// validates emails.
function validateEmail( givenEmail ){
  var flag = false; var firstpass = /^[A-Z0-9@._%+-]{6,254}$/i; // No invalid characters. Not to big or to short.
	var pattnemail = /^[A-Z0-9][A-Z0-9._%+-]{0,63}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;  
  if ( firstpass.test(givenEmail) == true ) {    
     flag = ( pattnemail.test(givenEmail) )? true : false;    
  } else {
    flag = false;    
  }  	
	return flag;
}
function validatepassword(p){  
  var firstpass = /^[A-Za-z0-9 ~!@#$%\^&*_\-+=`|\\\(\){}\[\]:;"'<>,\.?\/]{9,21}$/;
  var flag = ( firstpass.test(p) )? true : false;        	
	return flag;
}
function validateToken(t) {
  var tokentest = /^[A-Z0-9]{32}$/i;
  var flag = ( tokentest.test(t) )? true : false;        	
  return flag;
}


///Generates an activation token.
function generateToken() {
	var token = '';   var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (var i = 32; i > 0; --i) 
	{  token += chars[Math.round(Math.random() * (chars.length - 1))];  }           
	return token;
}


function isNumberic(item) {
	var test = /^[0-9]+$/;
	var flag = ( test.test(item) )? true : false;        	
	return flag;
}


 





var helpers = {
  getTodayyyymmdd:getTodayyyymmdd,
  getDisplayDateOfToday:getDisplayDateOfToday,
  shuffle:shuffle,
  makeYYYMMDDwithDate:makeYYYMMDDwithDate,
  getGivenDisplayDate:getGivenDisplayDate,
  converDisplayDateToYYYMMDD:converDisplayDateToYYYMMDD,
  validateEmail:validateEmail,
  validatepassword:validatepassword,
  validateToken:validateToken,
  generateToken:generateToken,
  AMPM12HourArray:AMPM12HourArray,
  mysqlTimeArray:mysqlTimeArray,
  isNumberic:isNumberic,
};
module.exports = helpers;