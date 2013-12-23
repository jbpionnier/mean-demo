'use strict';

var _ = require('lodash'),
    Book = require('../models/book');


module.exports = {

  index: function (req, res) {
    res.send(Book.find().populate('owner'));
  },

  create: function (req, res, next) {
    var newBook = new Book(req.body);

    newBook.save(function (err) {
      if (err) {return next(err);}
      res.json(newBook);
    });
  },

  load: function (req, id, next) {
    Book.findById(id, function (err, book) {
      if (err) {return next(err);}

      if (!book) {return next({status: 404, message: 'Book ' + id + ' is not found'});}

      next(null, book);
    });
  },

  show: function (req, res) {
    res.json(req.book);
  },

  update: function(req, res, next) {
    _.extend(req.book, req.body);

    req.book.save(function (err) {
      if (err) {return next(err);}
      res.json(req.book);
    });
  },

  destroy: function (req, res, next) {
    req.book.remove(function (err) {
      if (err) {return next(err);}
      res.json(true);
    });
  }

};
