var express = require('express');
var path = require('path');
var http = require('http');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var router = express.Router();
var app = express();
var mongoose = require('mongoose');

const port = 3000;

var index = require('./server/routes/app');
var starsRoute = require('./server/routes/stars');

mongoose.connect('mongodb://localhost:3000/app',
  { useNewUrlParser: true }, (err, res) => {
    if (err) {
      console.log('Connection failed');
    }
    else {
      console.log('Connected to database!');
    }
  }
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(logger('dev'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PATCH, PUT, DELETE, OPTIONS'
    );
    next();
});

app.use(express.static(path.join(__dirname, 'dist/stars')));

app.use('/', index);
app.use('/stars', starsRoute)

app.use(function(req, res, next) {
  res.render("index");
})

const server = http.createServer(app);

server.listen(port, function() {
  console.log('API running on localhost: ' + port)
});