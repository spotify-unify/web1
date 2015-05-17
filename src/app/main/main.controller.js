'use strict';

class MainCtrl {

  constructor ($scope) {
    $scope.scope = 'popular';

    $scope.setPopular = function() {
      $scope.scope = 'popular';
    };

    $scope.setLocal = function() {
      $scope.scope = 'local';
    };
  }
}

MainCtrl.$inject = ['$scope'];

export default MainCtrl;


