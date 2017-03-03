 (function (angular) {
  angular
    .module('theApp')
    .run(Run);

  Run.$inject = ['$rootScope'];

  function Run($rootScope) {
    // $rootScope.token = 'your-token-here'; PRODUCTION
    if ( $rootScope.token ){
    	console.log('yay, you added a token')
   	} else {
   		console.log('no token, no love')
   	}

    // $rootScope.today = function() {
    //   $scope.dt = new Date();
    // };
  }
})(window.angular);
