// Create web server application
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Create a server
const port = 3000;
app.listen(port, function(){
    console.log('Server listening on port ' + port);
});

// Set up body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Connect to the database
const MongoClient = require('mongodb').MongoClient;
let db;
MongoClient.connect('mongodb://localhost:27017', function(err, client){
    db = client.db('webstore');
});

// Create a GET route
app.get('/', function(req, res){
    res.send('Hello World');
});

// Create a POST route
app.post('/quotes', function(req, res){
    console.log('Hellooooooooooooooooooooooooooooooooo!');
    console.log(req.body);
    res.send('Post request received');
});

// Create a GET route to retrieve all documents from the collection
app.get('/quotes', function(req, res){
    db.collection('quotes').find().toArray(function(err, result){
        if(err) return console.log(err);
        res.send(result);
    });
});

// Create a POST route to insert a document into the collection
app.post('/quotes', function(req, res){
    db.collection('quotes').save(req.body, function(err, result){
        if(err) return console.log(err);
        console.log('Saved to database');
        res.redirect('/');
    });
});

// Create a PUT route