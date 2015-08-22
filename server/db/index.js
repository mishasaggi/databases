var mysql = require('mysql');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".


var dbConnection = mysql.createConnection({
  user     : 'root',
  password : '',
  database : 'chat'
});

dbConnection.connect(function(err){
  if(err) {
    console.error('error connecting:' err.stack); //check if this is via inbuild error handling 
  }

  console.log('connected as id' + connection.threadId); // check if this is also included in node module

});


