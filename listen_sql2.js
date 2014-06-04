var telehash = require("../index.js").v1.telehash;
var _myid;

telehash.seed(function (err) {
    if (err) {
        console.log(err);
        return;
    }
    server("echo.message.back");
});

function server(name) {
    telehash.listen(name, function ( conn ) {
            console.log("<<-- MESSAGE:", conn.message, " from:", conn.from, " via:", conn.source );
	    _myid = conn.message;
            var mysql = require("mysql");
            var connection = mysql.createConnection({
                host	: 'localhost',
	        database : 'buddylist',
	        user	: 'root',
	        password : ''
	    });
       	   connection.connect();    

            
connection.query(
    'select * from buddies where id = "'+_myid+'"'
    ,function(err, rows, columns){
        if (err) {
            console.log('ACCESS DENIED: '+err);
            return;
         }
        if(rows){
            console.log('returned row count '+rows.length);
            if(rows.length==0){
	      console.log("For given id Zero rows found. Returning access denied");
              conn.reply("ACCESS DENIED: ID NOT FOUND "+_myid);
	    }else {
		console.log("For given id row found. Return grant access");
                conn.reply("GRANT ACCESS: "+_myid);
	    }
        }
        }

);

connection.end();

}

);}
