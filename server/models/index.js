var db = require('../db');


module.exports = {

  messages: {
 
    get: function (cb) {
      var queryString = 'SELECT * FROM messages'; //do a RIGHT join to get all data
      dbConnection.query(queryString, function(error, results, fields){
        //pick out fields: for each message - user_id, room_id (say posted in)
        //optionally timestamp as well
        return cb(fields); //!!return all the results or pick up the field value?
      }

    },//a function which produces all the messages

    //let's pass the data all the way to these model functions 
    //and then extract the required fields
    post: function (data) {
      var queryString = 'INSERT INTO messages (body, user_id, room_id) 
                        values (?, (SELECT id FROM users WHERE name = ?),
                        (SELECT id FROM rooms WHERE name = ?))';
      var queryArgs = [data.text, data.username, data.roomname];
      dbConnection.query(queryString, queryArgs, function(error, results, fields){
        //return what?
      }

    } //a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function (data, cb) { // what will this be used for?? currently to check if user exists
      var queryString = 'SELECT id FROM users WHERE name = ?'
      var queryArgs = [data.username];
      dbConnection.query(queryString, function(error, results, fields){
        return fields; //!!return all the results or pick up the field value?
        //do I need callback to send these results to controller?
      }
    },
    post: function (data) {
      var queryString = 'INSERT INTO users (name) value (?)';
      var queryArgs = [data.username];
      dbConnection.query(queryString, queryArgs, function(error, results, fields){
        //return what?
      }
    }
  },
  // do I need rooms?? 
  rooms: {
    get: function() { // what will this be used for?? 
      var queryString = ''
      dbConnection.query(queryString, function(error, results, fields){
        return results; //!!return all the results or pick up the field value?
      }
    },
    post: function(data) {
      var queryString = 'INSERT INTO rooms (name) value (?)';
      var queryArgs = [data.roomname];
      dbConnection.query(queryString, queryArgs, function(error, results, fields){
        //return what?
      }
    }
  }
  
};








