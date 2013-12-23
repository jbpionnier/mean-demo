'use strict';

var User = require('../models/user');


module.exports = {

  index: function (req, res) {
    res.send(User.find());
  },

  create: function (req, res, next) {
    var newUser = new User(req.body);

    newUser.save(function (err) {
      if (err) {return next(err);}
      res.json(newUser);
    });
  },

  load: function (req, id, next) {
    User.findById(id, function (err, user) {
      if (err) {return next(err);}

      if (!user) {return next({status: 404, message: 'User ' + id + ' is not found'});}

      next(null, user);
    });
  },

  show: function (req, res) {
    res.json(req.user);
  },

  destroy: function (req, res, next) {
    req.user.remove(function (err) {
      if (err) {return next(err);}
      res.json(true);
    });
  }

};
