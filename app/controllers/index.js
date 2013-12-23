'use strict';

var books = require('./books'),
  users = require('./users');

module.exports = function(app) {
  /*
   app.get('/books', books.index);
   app.post('/books', books.create);

   app.param('book', books.load);

   app.get('/books/:book', books.show);
   app.put('/books/:book', books.update);
   app.delete('/books/:book', books.destroy);
   */

  app.resource('books', books);
  app.resource('users', users);

};
