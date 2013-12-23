'use strict';

demoApp.controller('UsersCtrl', function($scope, $route, User) {

  $scope.users = User.query();

  $scope.newUser = new User();

  $scope.save = function() {
    $scope.newUser.$save(function() {
      $route.reload();
    });
  };

  $scope.remove = function(user) {
    user.$remove(function() {
      $route.reload();
    });
  };

});
