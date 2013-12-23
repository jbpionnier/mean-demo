'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId,
    timestampPlugin = require('../middlewares/mongo').timestampPlugin;

var lengthValidator = function(value) {
  return value.length >= 3;
};


var BookSchema = new Schema({
  name: {type: String, required: true, trim: true, validate: [lengthValidator, 'Bouuh']},
  author: {type: String, trim: true},
  category: {type: String, enum: ['Cuisine', 'Javascript', 'Programmation', 'Divers', 'Roman', 'Science-Fiction']},
  owner: { type: ObjectId, ref: 'Users', index: true },
  note: {type: Number, min:0, max: 5}
});

BookSchema.post('save', function (book) {
  console.log('Book %s has been saved', book._id);
});

BookSchema.plugin(timestampPlugin);

module.exports = mongoose.model('Books', BookSchema);
