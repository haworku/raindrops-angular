 (function (angular) {
  angular
    .module('theApp')
    .run(Run);

  Run.$inject = ['$rootScope'];

  function Run($rootScope) {
    console.log('run!');
    $rootScope.today = function() {
      $scope.dt = new Date();
    };
  }
})(window.angular);
