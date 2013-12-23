'use strict';

var config = require('config').mongo,
    mongoose = require('mongoose'),
    validate = require('mongoose-validator').validate;


function mongo() {
  if (config.url == null) {
    throw new Error('config.mongo.url is missing');
  }

  mongoose.connection.on('error', function (err) {
    console.error('MongoDB error:', err);
    if (err) {throw err;}
  });

  mongoose.connection.once('open', function () {
    console.log('Connected to MongoDB');
  });

  mongoose.set('debug', config.debug);
  mongoose.connect(config.url);
}

mongo.validate = validate;
mongo.timestampPlugin = require('./plugins/mongoose-timestamp');

module.exports = mongo;