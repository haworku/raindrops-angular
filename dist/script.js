(function (angular) {
  angular.module('theApp', ['ngRoute',
                         	'ngSanitize',
                         	'angularMoment',
                         	'service.api',
                         	'directive.weatherBlock'
                         	]);
})(window.angular);

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

(function (angular) {
  angular.module('theApp')
    .controller('ForecastController', ForecastController);

  ForecastController.$inject = ['$rootScope', '$scope', '$location', '$q', 'moment', 'api'];

  function ForecastController($rootScope, $scope, $location, $q, moment, api) {
    let vm = this;
    vm.weather = {}; // For display: used in forecast.html
    vm.forecast = {}; // API response: forecast/daily? - five day forecast
    vm.current = {}; // API response: weather? - weather now

    /**
       * Assign API response
    */
    vm.assignCurrent = (response) => {
      vm.current = response;
    }
    vm.assignForecast = (response) => {
      vm.forecast = response.list; 
    }

    /**
      * @return {String} 'zip code' | 'coordinates'
    */
    vm.checkType = () => {
      if ($rootScope.zip !== 0 && $rootScope.load ){ 
        return 'zip code';
      } else {
        return 'coordinates';
      }
    }

    /**
       * Process api responses and return in format suitable for weather display
       * @param  {Object} current |  @param  {Object} forecast 
       * @return {Object}
    */
    vm.processData = (current,forecast) => {; 
    	let nestedData = {
    		now:  { 
    			summary: current.weather[0].description,
    			icon: `http://openweathermap.org/img/w/${ current.weather[0].icon }.png`,
					temp: current.main.temp.toFixed(1),
				},
				today: {
					date: moment(),
    			summary: forecast[0].weather[0].description,
    			icon: `http://openweathermap.org/img/w/${ forecast[0].weather[0].icon }.png`,
    			temp: forecast[0].temp.day.toFixed(1),
					max: forecast[0].temp.max.toFixed(1),
					min: forecast[0].temp.min.toFixed(1)
				},
				one:  { 
					date: moment().add(1, 'days'),
    			summary: forecast[1].weather[0].description,
    			icon: `http://openweathermap.org/img/w/${ forecast[0].weather[0].icon }.png`,
    			temp: forecast[1].temp.day.toFixed(1),
					max: forecast[1].temp.max.toFixed(1),
					min: forecast[1].temp.min.toFixed(1)
				},
				two:  { 
					date: moment().add(2, 'days'),
    			summary: forecast[2].weather[0].description,
    			icon: `http://openweathermap.org/img/w/${ forecast[0].weather[0].icon }.png`,
    			temp: forecast[2].temp.day.toFixed(1),
					max: forecast[2].temp.max.toFixed(1),
					min: forecast[2].temp.min.toFixed(1)
				},
				three:  { 
					date: moment().add(3, 'days'),
    			summary: forecast[3].weather[0].description,
    			icon: `http://openweathermap.org/img/w/${ forecast[0].weather[0].icon }.png`,
    			temp: forecast[3].temp.day.toFixed(1),
					max: forecast[3].temp.max.toFixed(1),
					min: forecast[3].temp.min.toFixed(1)
				},
				four:  { 
					date: moment().add(4, 'days'),
    			summary: forecast[4].weather[0].description,
    			icon: `http://openweathermap.org/img/w/${ forecast[0].weather[0].icon }.png`,
    			temp: forecast[4].temp.day.toFixed(1),
					max: forecast[4].temp.max.toFixed(1),
					min: forecast[4].temp.min.toFixed(1)

				},
				five:  { 
					date: moment().add(5, 'days'),
    			summary: forecast[5].weather[0].description,
    			icon: `http://openweathermap.org/img/w/${ forecast[0].weather[0].icon }.png`,
    			temp: forecast[5].temp.day,
					max: forecast[5].temp.max,
					min: forecast[5].temp.min
				}
			}

      console.log('forecast complete.');
    	return (nestedData);
    }

    /**
      * Determine if gathering weather by zip code or coordinates
      * Hit current and forecast APIs accordingly
      * Calls processData and assigns return to vm.weather for display
    */
    vm.getForecast = () => {
      console.log('forecasting...')

      if ($rootScope.zip !== 0 && $rootScope.load ){ 
        // when there's zipcode, use it. REFACTOR: try coordinates if fetch fails in .catch block
        $q.all([ 
          api.fetchCurrentByZip($rootScope.zip).then(vm.assignCurrent),
          api.fetchForecastByZip($rootScope.zip).then(vm.assignForecast) 
        ])
        .then((response) => { 
          vm.weather = vm.processData(vm.current, vm.forecast);
        })
        .catch((err) => {
          console.log(err);
        })

      } else if ($rootScope.coordinates !== {} && $rootScope.load) {  
        // Try coordinates when no zipcode REFACTOR: direct of fetch fails in .catch block
        $q.all([ 
          api.fetchCurrentByCoord($rootScope.coordinates.lat, $rootScope.coordinates.lon).then(vm.assignCurrent),
          api.fetchForecastByCoord($rootScope.coordinates.lat,$rootScope.coordinates.lon).then(vm.assignForecast) 
        ])
        .then((response) => { 
          vm.weather = vm.processData(vm.current, vm.forecast);
        })
        .catch((err) => {
          console.log(err);
        })

      } else {
        console.log('waiting for location');
      }
    } 
	}
})(window.angular);

;(function (angular) {
  angular.module('directive.weatherBlock', []);

  /**
   * simple directive builds weather forecast blocks
   */

  angular
    .module('directive.weatherBlock')
    .directive('weatherBlock', weatherBlock);

  weatherBlock.inject = [];
    function weatherBlock () {
      return {
        restrict: 'AE',
        scope: {
          weather: '=',
          name: '='
        },

   
        link: function (scope, elem, attrs, ngModel)  {
      	},

      	template: `
      	<h3 ng-bind="name"></h3>
 				<img src="{{weather.icon}}">
				<span 
					class="weather-summary"  
					ng-bind="weather.summary">
				</span>
				<span 
					class="weather-temp" 
					ng-bind="weather.temp + '°'">	
				</span>
 				`,

	    }
	   }
})(window.angular);
;(function(angular) {
  'use strict';

angular.module('service.api', []);

angular
  .module('service.api')
  .provider('api', function() {
    let config = {
      apiBase: 'http://generic.io/',
      apiKey: 'really-not-ideal'
    };

    return {
      config: function(o) {
        angular.copy(o, config);
      },

      $get: ['$rootScope', '$http', '$q', function($rootScope, $http, $q) {

        return {
          /**
           * get forecast for current date and next five daily summaries at zipcode
           * @param  {Integer} zipcode
           * @return {Promise}
           */
          fetchForecastByZip: (zipcode) => {
            let deferred = $q.defer();
    
            $http
              .get(`${ config.apiBase }forecast/daily?zip=${ zipcode },us&cnt=6&units=imperial${ config.apiKey }`)

              .success((data) => {
                deferred.resolve(data);
              })
              .error((err) => {
                deferred.reject(err);
              });

            return deferred.promise;
          },
           /**
           * get current weather at zip code
           * @param  {Integer} zipcode
           * @return {Promise}
           */
          fetchCurrentByZip: (zipcode) => {
            let deferred = $q.defer();

            $http
              .get(`${ config.apiBase }weather?zip=${ zipcode },us&units=imperial${ config.apiKey }`)

              .success((data) => {
                deferred.resolve(data);
              })
              .error((err) => {
                deferred.reject(err);
              });

            return deferred.promise;
          },
            /**
           * get forecast for current date and next five daily summaries at coordinates
           * @param  {Integer} lat | @param  {Integer} lon
           * @return {Promise}
           */
          fetchForecastByCoord: (lat,lon) => {
            let deferred = $q.defer();
            
            $http
              .get(`${ config.apiBase }forecast/daily?lat=${ lat }&lon=${ lon }&cnt=6&units=imperial${ config.apiKey }`)

              .success((data) => {
                deferred.resolve(data);
              })
              .error((err) => {
                deferred.reject(err);
              });

            return deferred.promise;
          },
           /**
           * get current weather at coordinates
           * @param  {Integer} lat | @param  {Integer} lon
           * @return {Promise}
           */
          fetchCurrentByCoord: (lat, lon) => {
            let deferred = $q.defer();
            
            $http
              .get(`${ config.apiBase }weather?lat=${ lat }&lon=${ lon }&units=imperial${ config.apiKey }`)

              .success((data) => {
                deferred.resolve(data);
              })
              .error((err) => {
                deferred.reject(err);
              });

            return deferred.promise;
          },

        };
      }]
    };
  });
   
})(window.angular);
