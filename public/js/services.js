'use strict';

demoApp.factory('User', function ($resource) {

  return $resource('api/users/:userId', {userId: '@_id'});

});

demoApp.factory('Book', function ($resource) {

  return $resource('api/books/:bookId', {bookId: '@_id'}, {
    update: {
      method: 'PUT'
    }
  });
});


demoApp.factory('HttpErrorInterceptor', function ($rootScope, $q) {
      return function (promise) {
        return promise.then(null, function (response) {
          if (response.data && response.data.error) {
            $rootScope.$broadcast('http-error-interceptor', response.data.error);
          }
          return $q.reject(response);
        });
      };
    });
