 /* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */

var mysql = require('mysql');
var request = require("request"); // You might need to npm install the request module!
var expect = require('../../node_modules/chai/chai').expect;

describe("Persistent Node Chat Server", function() {
  var dbConnection;

  beforeEach(function(done) {
    dbConnection = mysql.createConnection({
      user: "root",
      password: "",
      database: "chat"
    });
    dbConnection.connect();

    //    var tablename = "messages"; // TODO: fill this out

     // Empty the db table before each test so that multiple tests
     // * (or repeated runs of the tests) won't screw each other up: 
    // dbConnection.query("truncate " + tablename, done);


  });

  afterEach(function() {
    dbConnection.end();
  });

  it("Should insert posted messages to the DB", function(done) {
    // Post the user to the chat server.
    request({ method: "POST",
              uri: "http://127.0.0.1:3000/classes/users",
              json: { username: "Valjean" }
    }, function () {
      // Post a message to the node chat server:
      request({ method: "POST",
              uri: "http://127.0.0.1:3000/classes/messages",
              json: {
                username: "Valjean",
                message: "Three days is all I need.",
                roomname: "Hello"
              }
      }, function () {
        // Now if we look in the database, we should find the
        // posted message there.

        // TODO: You might have to change this test to get all the data from
        // your message table, since this is schema-dependent.
        var queryString = "SELECT messages.body, users.name, rooms.name FROM messages JOIN users ON messages.user_id = users.id JOIN rooms ON messages.room_id = rooms.id"; //no change needed
        var queryArgs = ['messages'];

        dbConnection.query(queryString, function(err, results) {
          // Should have one result:
          expect(results.length).to.equal(1);

          // TODO: If you don't have a column named text, change this test.
          // Mon: changed to body
          expect(results[0].body).to.equal("Three days is all I need.");

          done();
        });
      });
    });
  });

  it("Should output all messages from the DB", function(done) {
    // Let's insert a message into the db
    // M: Insert to multiple tables in one query string?
    // Change the text to body and roomname to name - uses a join

      var queryString1 = "INSERT INTO rooms (name) value ('main')";
      var queryString2 = "INSERT INTO users (name) value ('Joe')"
      var queryString3 = "INSERT INTO messages (body, user_id, room_id) values ('Men like you can never change!',(SELECT id FROM users WHERE name = 'Joe'),(SELECT id FROM rooms WHERE name = 'main'))";

       // var queryArgs = []; //M: remove values and put them as args later

    // TODO - The exact query string and query args to use
    // here depend on the schema you design, so I'll leave
    // them up to you. */
    dbConnection.query(queryString1, function(err) {
      if (err) { throw err; }
    });

    dbConnection.query(queryString2, function(err) {
      if (err) { throw err; }
    });

    dbConnection.query(queryString3, function(err) {
      if (err) { throw err; }

      // Now query the Node chat server and see if it returns
      // the message we just inserted:
      

      request("http://127.0.0.1:3000/classes/messages", function(error, response, body) {
        var messageLog = JSON.parse(body);
        expect(messageLog[0].text).to.equal("Men like you can never change!");
        expect(messageLog[0].roomname).to.equal("main");
        done();
      });
    });
  });
});
