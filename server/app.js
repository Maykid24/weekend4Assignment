var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended:false});
var pg = require('pg');
//Makes a route to the database for things to be stored
var connectionString = 'postgres://localhost:5432/weekend4assign';
//Access the public folder throughout your program
app.use(express.static('public'));

//Base url of the website
app.get('/', function (req, res) {
  res.sendFile(path.resolve('views/index.html'));
});//End of base url function

//Creates a new item in the database for a to do list
app.post('/createList', urlencodedParser, function (req, res) {
  pg.connect(connectionString, function(err, client, done) {
      client.query('INSERT INTO to_do (tasks, done) VALUES ($1, $2)', [req.body.listToDo, req.body.complete]);
  });//end of connect function
});//end of Post create List

//Gets the database information and sends it to script.js AJAX
app.get('/getTasks', function (req, res) {
  var results = [];
  pg.connect(connectionString, function (err, client, done) {
    var call = client.query("SELECT * FROM to_do");
    call.on('row', function (row) {
      results.push(row);
    });//End of row function
    call.on('end', function () {
      return res.json(results);
    });//end of call on End function
  });//End of pg connect
});//End of get Tasks Function



//Spins up the server
app.listen(process.env.PORT || 8080, function () {
  console.log('Listening on 8080');
});//End of app listen function
