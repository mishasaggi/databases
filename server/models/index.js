var db = require('../db');


module.exports = {

  messages: {
 
    get: function (cb) {
      var queryString = "SELECT * FROM messages"; //do a RIGHT join to get all data
      db.query(queryString, function(error, results, fields){
        //pick out fields: for each message - user_id, room_id (say posted in)
        //optionally timestamp as well
        cb(results); //!!return all the results or pick up the field value?
      });

    },//a function which produces all the messages

    //let's pass the data all the way to these model functions 
    //and then extract the required fields
    post: function (data, cb) {

      if(!module.exports.users.get(data)){ 
          module.exports.users.post(data);
        }

      if(!module.exports.rooms.get(data)){
          module.exports.rooms.post(data);
        }

      //insert message associated with the user and room
      //this is a javascript file so need to escape the new line characters!
      var queryString = "INSERT INTO messages \
      (body, user_id, room_id) values \
      (?, (SELECT id FROM users WHERE name = ?), \
        (SELECT id FROM rooms WHERE name = ?))";
      // var queryArgs = [data.text, data.username, data.roomname];
      var queryArgs = ['hello', 'hello', 'hello'];
      db.query(queryString, queryArgs, function(error, results, fields){
        if(error) throw error;
        cb(true);//any truthy value
      });

    } //a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function (data, cb) { // what will this be used for?? currently to check if user exists
      cb = cb || _.identity;
      var queryString = "SELECT id FROM users WHERE name = ?"
      var queryArgs = [data.username];
      db.query(queryString, queryArgs, function(error, results, fields){
        cb(results); //!!return all the results or pick up the field value?
        //do I need callback to send these results to controller?
      });
    },
    post: function (data, cb) {
       cb = cb || _.identity;
      var queryString = "INSERT INTO users (name) value (?)";
      var queryArgs = [data.username];
      db.query(queryString, queryArgs, function(error, results, fields){
        cb(true);
      });
    }
  },
  // do I need rooms?? - YES
  rooms: {
    get: function(data, cb) { // what will this be used for?? 
      cb = cb || _.identity;
      var queryString = "SELECT id FROM rooms WHERE name = ?";
      var queryArgs = [data.roomname];
      db.query(queryString, queryArgs, function(error, results, fields){
        cb(results); //!!return all the results or pick up the field value?
      });
    },
    post: function(data, cb) {
      cb = cb || _.identity;
      var queryString = "INSERT INTO rooms (name) value (?)";
      var queryArgs = [data.roomname];
      db.query(queryString, queryArgs, function(error, results, fields){
        cb(true);
      });
    }
  }
  
};








