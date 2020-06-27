


function POST(  thing, destination, cb, that ) {
    var jsonItem = JSON.stringify( thing );
    var http = new XMLHttpRequest();
    http.onreadystatechange = function() {
        if (http.readyState === 4 && http.status === 200) {
            
            var data = http.responseText;
            if (data[0] === '<') {
                window.location.replace("/Login/");
            } else {
               cb(data, that);
            }
        }
    }.bind(that);
    http.open( 'POST', destination, true);
    http.setRequestHeader('Content-Type', 'application/json');
    http.send(jsonItem);
}



function GET( destination, cb, that ) {
    var http = new XMLHttpRequest();
    http.onreadystatechange = function() {
        if (http.readyState === 4 && http.status === 200) {            
            var data = http.responseText;                        
            cb(data, that);            
        }
        else if (  http.status === 300) {

        }
    }.bind(that);
    http.open( 'GET', destination, true);
    http.send();
}




var sender = {
    POST:POST,
    GET:GET
}
export default sender;