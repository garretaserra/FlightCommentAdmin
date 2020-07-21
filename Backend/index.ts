//Import libraries
import express = require('express');
import bodyParser = require('body-parser');
import cors = require('cors');
import errorHandler = require('errorhandler');
import mongoose = require('mongoose');

//Import routes
let testRouter = require('./routes/test');

//Server variable initialization
let app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(errorHandler());

//Add routes to express app
app.use('/test', testRouter);

//Make app listen on port 8080
let port: number = 8080;
app.listen(port);

// Give basic info through console
console.log('Server listening on port ' + port);
console.log('Test server at: http://localhost:' + port + '/test/get');

//Mongo database connection
let dbHost: string = 'localhost';
let dbPort: number = 27017;
let dbName: string = 'FlightCommentAdmin'
mongoose.connect('mongodb://' + dbHost + ':' + dbPort + '/' + dbName,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() =>{
  console.log('Connection to the database successful');
}).catch(err =>{
  console.log(`Database error: ${err.message}`);
});

module.exports = app;
