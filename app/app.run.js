 (function (angular) {
  angular
    .module('theApp')
    .run(Run);

  Run.$inject = ['$rootScope', 'moment'];

  function Run($rootScope, moment) {
    $rootScope.zip = 0;
    $rootScope.coordinates = {};
    $rootScope.load = false;

    $rootScope.loadDefault = () => {
      console.log('loadDefault')
      $rootScope.zip = 60661;
      $rootScope.load = true;
      $rootScope.$digest();
    }

    getLocation = () => {
      let showPosition = (pos) => {
        $rootScope.coordinates = { lat: pos.coords.latitude, lon: pos.coords.longitude};
        console.log('coordinates', $rootScope.coordinates)
        $rootScope.load = true;
        $rootScope.$digest();
      }

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition)      
        $rootScope.zip = 0;
      } else {
        console.log('geolocation not supported, using default');
        $rootScope.loadDefault();
      }
    }
    
    getLocation();
    $rootScope.today = function() {
      moment().utc().valueOf();
    };


  }
})(window.angular);
