/*jshint -W098 */
'use strict';

var mongooseValidationError = require('mongoose').Document.ValidationError;


function parseErrFromMongoose(err) {
  if (!err.errors) {return err;}
  var firstError = Object.keys(err.errors)[0];
  err.message = err.errors[firstError].message || err.message;
  return err;
}

exports.errorHandler = function (options) {
  var stack = options.stack || false;

  return function (err, req, res, next) {
    if (err instanceof mongooseValidationError) {
      err = parseErrFromMongoose(err);
    }

    console.error(err.message);
    if (err.stack) {console.error(err.stack);}

    var error = {message: err.message, fields: err.fields};
    if (stack && err.stack) {error.stack = err.stack;}

    var status = err.statusCode || err.status || (err.type === 'ENOTFOUND' ? 404 : 500);
    res.json(status, {error: error});
  };
};

