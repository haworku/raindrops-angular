;(function(angular) {
  'use strict';

angular.module('service.api', []);

angular
  .module('service.api')
  .provider('api', function() {
    let config = {
      apiBase: 'http://generic.io/',
    };

    return {
      config: function(o) {
        angular.copy(o, config);
      },

      $get: ['$rootScope', '$http', '$q', function($rootScope, $http, $q) {
        let _headers = {'headers': {'token': `${$rootScope.token}`}};

        return {
          /**
           * sends a limited query for next three daily summaries from zipcode
           * @param  {Integer} zipcode
           * @return {Promise}
           */
          fetchDurationForecastForZip: (zipcode, durationStart, durationEnd) => {
            let deferred = $q.defer();
            
            $http
              .get(`${ config.apiBase }data?datasetid=GHCND&locationid=ZIP:${ zipcode }&startdate=${ durationStart }&enddate=${ durationEnd }`, _headers)

              .success((data) => {
                deferred.resolve(data);
              })
              .error((err) => {
                deferred.reject(err);
              });

            return deferred.promise;
          },

          fetchDataTypes: () => {
            let deferred = $q.defer();
            $http
              .get(`${ config.apiBase}datatypes`, config.headers)

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
