var models = require('../models');
var bluebird = require('bluebird');



module.exports = {

  messages: {
    get: function (req, res) {
      models.messages.get(function(data){ //!!make sure the data is being passed from ajax
        //construct response from messages
      var headers = {
        Content-Type: 'application/json'
      };
      var statusCode = 200;

      res.writeHead(statusCode, headers);
      res.end(JSON.stringify(data)); //the result sent back is what is stringified here

    }, // a function which handles a get request for all messages
    post: function (req, res) {

      if(module.exports.users.get(data)){
        //user exists
        //insert message associated with the user
      module.exports.messages.post(data);

    } else {
      //insert the new user in table
      module.exports.users.post(data);
      //insert message associated with the user
      module.exports.messages.post(data);
    }
      
    } // a function which handles posting a message to the database

    var headers = {
        Content-Type: 'application/json'
      };
    var statusCode = 201; // which status code?

    res.writeHead(statusCode, headers);
    res.end();
  },

//where are these going to be used?
  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {}
  },

  rooms: {
    get: function() {},
    post: function() {}
  }

};

