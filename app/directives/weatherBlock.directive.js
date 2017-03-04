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