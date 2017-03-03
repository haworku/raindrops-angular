(function (angular) {
  angular.module('theApp')
    .controller('ForecastController', ForecastController);

  ForecastController.$inject = ['$scope', '$location', 'moment'];

  function ForecastController($scope, $location, moment) {
    let vm = this;
    vm.forecastDuration = moment.duration(2, 'd')
    vm.getForecast = () => {
    	let start = moment($rootScope.today).format('YYYY-MM-DD')
    	let endUnformatted =  vm.today.add(vm.forecastDuration);
    	let end = moment(endUnformatted).format('YYYY-MM-DD')
          
    api.get(zip, start, end)
    .then((response) => { 
      vm.weatherObj = vm.processData(response.results);
    })
    .catch((err) => {
      console.log(err);
    });  

    }
 	 


}
})(window.angular);
