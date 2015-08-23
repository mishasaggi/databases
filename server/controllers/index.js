var models = require('../models');
var bluebird = require('bluebird');



module.exports = {

  messages: {
    get: function (req, res) {
      console.log("in controller messages get: ", req, res);
      models.messages.get(function(data){ //!!make sure the data is being passed from ajax
        //construct response from messages
        var statusCode = 200;
        var headers = defaultCorsHeaders;
        headers['Content-Type'] = "application/json";
        res.writeHead(statusCode, headers);
        res.end(JSON.stringify(data)); //the result sent back is what is stringified here
      });
    }, // a function which handles a get request for all messages

    post: function (req, res) {
      models.messages.post(req.data, function(){
        var statusCode = 201;
        var headers = defaultCorsHeaders;
        headers['Content-Type'] = "application/json";
        res.writeHead(statusCode, headers);
        rs.end();
      });
    }
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

var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

