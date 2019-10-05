



/** functon POST 
	sends thing as a json item then runs callback.
	when the first character is < the server wants to redirect to 
	the login page.
*/
function POST(  thing, destination, cb  ) {
    var jsonItem = JSON.stringify( thing );
    var http = new XMLHttpRequest();
    http.onreadystatechange = function() {
        if (http.readyState == 4 && http.status == 200) {
            
            var data = http.responseText;
            if (data[0] == '<') {
                window.location.replace("/Login/");
            } else {
               cb(data);
            }
        }
    };
    http.open( 'POST', destination, true);
    http.setRequestHeader('Content-Type', 'application/json');
    http.send(jsonItem);
}



/** function GET
	gets data from destination.
*/
function GET( destination, cb ) {
    var http = new XMLHttpRequest();
    http.onreadystatechange = function() {
        if (http.readyState == 4 && http.status == 200) {            
            var data = http.responseText;                        
            cb(data);            
        }
    };
    http.open( 'GET', destination, true);
    http.send();
}




var sender = {
    POST:POST,
    GET:GET
}
export default sender;