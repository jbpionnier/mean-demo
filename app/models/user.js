'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    mongo = require('../middlewares/mongo'),
    validate = mongo.validate;

var UserSchema = new Schema({
  name: {type: String, required: true, unique: true, trim: true},
  email: {type: String, required: true, unique: true, lowercase: true, trim: true, validate: [validate('isEmail')]}
});


UserSchema.plugin(mongo.timestampPlugin);

module.exports = mongoose.model('Users', UserSchema);
