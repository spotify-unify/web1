'use strict';

class MainCtrl {

  constructor ($scope) {
    $scope.type = 'popular';

    $scope.setPopular = function() {
      $scope.type = 'popular';
    };

    $scope.setLocal = function() {
      $scope.type = 'local';
    };
  }
}

MainCtrl.$inject = ['$scope'];

export default MainCtrl;


