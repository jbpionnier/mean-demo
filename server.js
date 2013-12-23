'use strict';

var express = require('express'),
  app = express();


app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/bower_components'));

app.use(express.urlencoded());
app.use(express.cookieParser());


app.configure('development', function() {
  app.use(express.logger('dev'));
  app.use(express.errorHandler({dumpException: true, showStack: true}));
});

app.configure('production', function() {
  app.use(express.errorHandler());
});


app.use('/api', require('./app/api')());


app.listen(3000, function() {
  console.log('Started mean-demo in', app.settings.env, 'on port', this.address().port);
});
