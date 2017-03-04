 (function (angular) {
  angular
    .module('theApp')
    .run(Run);

  Run.$inject = ['$rootScope', 'moment'];

  function Run($rootScope, moment) {
    // $rootScope.token = 'your-token-here'; PRODUCTION

    if ( $rootScope.token ){
    	console.log('yay, you added a token')
   	} else {
   		console.log('no token, no love')
   	}

    $rootScope.zip = 60661;
    $rootScope.today = function() {
      moment().utc().valueOf();
    };
  }
})(window.angular);
