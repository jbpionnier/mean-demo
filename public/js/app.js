'use strict';

var demoApp = angular.module('demoApp', ['ngRoute', 'ngResource']);

demoApp.config(function($routeProvider, $httpProvider) {

  $httpProvider.responseInterceptors.push('HttpErrorInterceptor');

  $routeProvider
    .when('/books', {
      templateUrl: 'partials/books.html',
      controller: 'BooksCtrl',
      navItem: 'books'
    })
    .when('/books/:bookId', {
      templateUrl: 'partials/book-edit.html',
      controller: 'BookCtrl',
      navItem: 'books'
    })
    .when('/users', {
      templateUrl: 'partials/users.html',
      controller: 'UsersCtrl',
      navItem: 'users'
    })
    .otherwise({
      redirectTo: '/books'
    });

});
