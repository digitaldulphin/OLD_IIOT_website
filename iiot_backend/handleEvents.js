const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;		


function Setup() {
	// App configuration
	const APP_ID = 'c2ef3b04-35bd-4279-8a2e-5f1d70b298d6';		
	const APP_SECRET = 'KyweNTn5h]/Gv]gKwV_qkT3xC3BpXeO3';	
	const SCOPES = 'https://graph.microsoft.com/.default';		
  	const TENNANT = 'af982b9c-6746-431b-81be-c3ade22d56f0'; //// GUID
	const TokenEndpoin = `https://login.microsoftonline.com/{${TENNANT}}/oauth2/v2.0/token`;
	const sendcontent = `client_id=${APP_ID}&scope=${SCOPES}&client_secret=${APP_SECRET}&grant_type=client_credentials`;			
	const api_url_readCalender = `https://graph.microsoft.com/v1.0//users/${TENNANT}/calendar/events`;
	/// Get token...
	POST( TokenEndpoin, sendcontent, (data) => {		
		const token_obj = JSON.parse(data);				
		GET( api_url_readCalender, token_obj, (data) => {
			var ojv = JSON.parse(data);
		});						
	}); 
}


function POST(destination, content, cb) {			
	var http = new XMLHttpRequest();
	http.onreadystatechange = function() {
		if (http.readyState == 4 && http.status == 200) {            
			var data = http.responseText;
			cb(data);    
		}		
	};
	http.open( 'POST', destination, true);		
	http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	http.send(content);	
}


function GET( destination, token,  cb ) {	
	var http = new XMLHttpRequest();
	http.onreadystatechange = function() {
		if (http.readyState == 4 && http.status == 200) {            
			var data = http.responseText;                        
			cb(data);            
		}
	};
	http.open( 'GET', destination, true );	
	http.setRequestHeader('Authorization',  "Bearer " + token.access_token);	
	http.send();
}


module.exports = {
	Setup:Setup,	
};