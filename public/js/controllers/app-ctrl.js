'use strict';

demoApp.controller('AppCtrl', function($scope, $timeout) {

  $scope.$on('$routeChangeSuccess', function(e, current) {
    $scope.currentNavItem = current.navItem;
  });

  $scope.$on('$routeChangeStart', function() {
    $scope.closeAlert();
  });

  $scope.$on('http-error-interceptor', function(e, error) {
    $scope.alert = {
      type: 'danger',
      message: error.message || error
    };

    $timeout($scope.closeAlert, 5000);
  });

  $scope.closeAlert = function() {
    delete $scope.alert;
  };


});
