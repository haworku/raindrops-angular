 (function (angular) {
  angular
    .module('theApp')
    .run(Run);

  Run.$inject = ['$rootScope', 'moment'];

  function Run($rootScope, moment) {
    $rootScope.zip = 0;
    $rootScope.coordinates = {};
    $rootScope.load = false;

    // Geolocate and Load
    $rootScope.loadDefault = () => {
      console.log('loading default')
      $rootScope.zip = 60661;
      $rootScope.load = true;
    }

    $rootScope.getLocation = () => {
      let showPosition = (pos) => {
        $rootScope.coordinates = { lat: pos.coords.latitude, lon: pos.coords.longitude};
        console.log('coordinates', $rootScope.coordinates)
        $rootScope.load = true;
        $rootScope.$digest();
      }

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition)      
        $rootScope.zip = 0; // empty zip code because we are using coordinates
      } else {
        console.log('geolocation not supported');
        $rootScope.loadDefault();
      }
      $rootScope.$digest();
    }
    
    $rootScope.getLocation();

    // Moment
    $rootScope.today = function() {
      moment().utc().valueOf();
    };


  }
})(window.angular);
