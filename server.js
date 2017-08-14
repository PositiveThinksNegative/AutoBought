var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;
  mongoose = require('mongoose'),
  Product = require('./api/models/ProductModel'),
  Client = require('./api/models/ClientModel'),
  bodyParser = require('body-parser');
  
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/db'); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/Routes');
routes(app);

app.listen(port);

console.log('Autobought RESTful API server started on: ' + port);
