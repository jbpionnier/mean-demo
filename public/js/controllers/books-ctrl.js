'use strict';

demoApp.controller('BooksCtrl', function($scope, $route, Book) {

  $scope.books = Book.query();

  $scope.newBook = new Book();

  $scope.save = function() {
    $scope.newBook.$save(function() {
      $route.reload();
    });
  };

  $scope.remove = function(book) {
    book.$remove(function() {
      $route.reload();
    });
  };

});


demoApp.controller('BookCtrl', function($scope, $route, $location, Book, User) {

  $scope.book = Book.get({bookId: $route.current.params.bookId});

  $scope.users = User.query();

  $scope.save = function() {
    $scope.book.$update(function() {
      $location.url('/#/books');
    });
  };

});
