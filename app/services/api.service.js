;(function(angular) {
  'use strict';

angular.module('service.api', []);

angular
  .module('service.api')
  .provider('api', function() {
    var config = {
      apiBase: 'http://generic1237.io/',
      headers: {},
      apiBranch: {},
    };

    return {
      config: function(o) {
        angular.copy(o, config);
      },

      $get: ['$rootScope', '$http', '$q', function($rootScope, $http, $q) {
        return {
          /**
           * sends a limited query for next three daily summaries from zipcode
           * @param  {Integer} zipcode
           * @return {Promise}
           */
          query3Day: (zipcode) => {
            let deferred = $q.defer();
            let dateRange = {start: '', end: ''}

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
