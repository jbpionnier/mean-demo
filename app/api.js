'use strict';

var express = require('express'),
    middlewares = require('./middlewares'),
    mongo = require('./middlewares/mongo');

require('express-resource');
require('express-mongoose');

module.exports = function () {

  mongo();

  var app = express();

  app.use(express.json());
  app.use(express.urlencoded());

  app.use(app.router);
  app.use(middlewares.errorHandler({stack: true}));


  require('./controllers')(app);

  app.all('/*', function (req, res, next) {
    next({status: 405, message: 'Method Not Allowed'});
  });

  return app;
};
