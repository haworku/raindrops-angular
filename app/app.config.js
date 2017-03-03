(function(angular) {
  angular
    .module('theApp')
    .config(Config);

  Config.$inject = ['$sceDelegateProvider', '$routeProvider', '$locationProvider', 'apiProvider'];  

  function Config($sceDelegateProvider, $routeProvider, $locationProvider, apiProvider) {

    $routeProvider
      .when('/welcome', {
        templateUrl: 'app/views/welcome.html',
        controller: 'WelcomeController',
        controllerAs: 'welcome',
      })
      .when('/forecast', {
        templateUrl: 'app/views/forecast.html',
        controller: 'ForecastController',
        controllerAs: 'forecast',
      })
      .otherwise({
        redirectTo: '/welcome',
      });

    $locationProvider.html5Mode(true);

    $sceDelegateProvider.resourceUrlWhitelist([
      'self',
    ]);

    apiProvider.config({
      apiBase: 'https://www.ncdc.noaa.gov/cdo-web/api/v2/',
    });
    
  }
})(window.angular);
