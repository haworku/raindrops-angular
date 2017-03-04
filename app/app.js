(function (angular) {
  angular.module('theApp', ['ngRoute',
                         	'ngSanitize',
                         	'angularMoment',
                         	'service.api',
                         	'directive.weatherBlock'
                         	]);
})(window.angular);
