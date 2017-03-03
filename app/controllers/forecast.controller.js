(function (angular) {
  angular.module('theApp')
    .controller('ForecastController', ForecastController);

  ForecastController.$inject = ['$scope', '$location', 'moment'];

  function ForecastController($scope, $location, moment) {
    let vm = this;
    vm.zip = 60661;
    vm.forecastDuration = moment.duration(2, 'd')
    vm.weatherObj = {}; // data from various stations, nested by date and then by datatype 

    vm.processData = (data) => {
    	let nestedData = {}

    	data.forEach( result => {
    		if ( result.date in nestedData === false) { 
    			nestedData[result.date] = {};
    		}

    		if ( result.dataType in nestedData[result.date] == false) {
    			// console.log(nestedData[result.date]);
    			nestedData[result.date][result.datatype] = result.value;
    		} else {
    			nestedData[result.date][result.datatype] += result.value;
    		}
    	})

    	return nestedData
    }

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
