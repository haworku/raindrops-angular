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
