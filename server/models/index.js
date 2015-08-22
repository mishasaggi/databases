var db = require('../db');


module.exports = {

  messages: {
 
    get: function () {
      var queryString = 'SELECT * FROM messages'; //do a RIGHT join to get all data
      dbConnection.query(queryString, function(error, results, fields){
        //pick out fields: for each message - user_id, room_id (say posted in)
        //optionally timestamp as well
        
      }

    },//a function which produces all the messages
    post: function (text, user, room) {
      var queryString = 'INSERT INTO messages (body, user_id, room_id) 
                        values (?, (SELECT id FROM users WHERE name = ?),
                        (SELECT id FROM rooms WHERE name = ?))';
      var queryArgs = [text, user, room];
      dbConnection.query(queryString, queryArgs, function(error, results, fields){
        
      }

    } //a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function (user) { // what will this be used for?? currently to check if user exists
      var queryString = 'SELECT id FROM users WHERE name = ?'
      var queryArgs = [user];
      dbConnection.query(queryString, function(error, results, fields){
        //return result in boolean
        
      }
    },
    post: function (user) {
      var queryString = 'INSERT INTO users (name) value (?)';
      var queryArgs = [user];
      dbConnection.query(queryString, queryArgs, function(error, results, fields){
        
      }
    }
  },
  // do I need rooms?? 
  rooms: {
    get: function() { // what will this be used for?? 
      var queryString = ''
      dbConnection.query(queryString, function(error, results, fields){
        
      }
    },
    post: function(room) {
      var queryString = 'INSERT INTO rooms (name) value (?)';
      var queryArgs = [room];
      dbConnection.query(queryString, queryArgs, function(error, results, fields){
        
      }
    }
  }
  
};

var requestHandler = function(text, user, room, request){

//logic that handles the above methods:
//POST:

  if(request === 'POST'){
    if(module.exports.users.get(user)){
      //insert message associated with the user
      module.exports.messages.post(text, user, room)

    } else {
      //insert the new user in table
      module.exports.users.post(user);
      //insert message associated with the user
      module.exports.messages.post(text, user, room);
    }
  }

//GET:
//select all from messages table using a RIGHT JOIN
//order by timestamp or just default should work too
  if(request === 'GET'){
    module.exports.messages.get();
  }
}






