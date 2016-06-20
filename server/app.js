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
      done();
  });//end of connect function
  res.end();
});//end of Post create List

//Gets the database information and sends it to script.js AJAX
app.get('/getTasks', function (req, res) {
  var results = [];
  pg.connect(connectionString, function (err, client, done) {
    var call = client.query("SELECT * FROM to_do");
    call.on('row', function (row) {
      results.push(row);
      done();
    });//End of row function
    call.on('end', function () {
      return res.json(results);
    });//end of call on End function
  });//End of pg connect
});//End of get Tasks Function

//Delete post that deletes individual tasks from the list
app.post('/deleteList', urlencodedParser, function (req, res) {
  var results = [];
  pg.connect(connectionString, function (err, client, done) {
    var query = client.query('DELETE FROM to_do WHERE id= '+req.body.id+';');
    var rows = 0;
    query.on('row', function (row) {
      results.push(row);
      done();
    });//end of query on function
    query.on('end', function () {
      return res.json(results);
    });//query on end function
  });//end of pg connect function
});//End of post delete List

//Complete task function
app.post('/completeTask', urlencodedParser, function (req, res) {
  pg.connect(connectionString, function (err, client, done) {
    var id = req.body.id;
    client.query('UPDATE to_do SET done=true WHERE done=false AND id='+id+';');
    done();
  });//end of pg connect function
});//end of completeTask post

//Spins up the server
app.listen(process.env.PORT || 8080, function () {
  console.log('Listening on 8080');
});//End of app listen function
