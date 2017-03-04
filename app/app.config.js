(function(angular) {
  angular
    .module('theApp')
    .config(Config);

  Config.$inject = ['$sceDelegateProvider', '$routeProvider', '$locationProvider', 'apiProvider'];  

  function Config($sceDelegateProvider, $routeProvider, $locationProvider, apiProvider) {

    $routeProvider
      .when('/forecast', {
        templateUrl: 'app/views/forecast.html',
        controller: 'ForecastController',
        controllerAs: 'forecast',
      })
      .otherwise({
        redirectTo: '/forecast',
      });

    $locationProvider.html5Mode(true);

    $sceDelegateProvider.resourceUrlWhitelist([
      'self',
    ]);

    apiProvider.config({
      apiBase: 'http://api.openweathermap.org/data/2.5/',
      apiKey: '&APPID=d851c070fcf45167e7011c23bad6ac2b'
    });
    
  }
})(window.angular);
