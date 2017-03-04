(function (angular) {
  angular.module('theApp')
    .controller('ForecastController', ForecastController);

  ForecastController.$inject = ['$rootScope', '$scope', '$location', '$q', 'moment', 'api'];

  function ForecastController($rootScope, $scope, $location, $q, moment, api) {
    let vm = this;
    vm.zip = 60661;
    vm.forecastDuration = moment.duration({'days' : 2});
    vm.weatherObj = {}; 
    vm.today = moment(new Date());
    // data from various stations, nested by date and then by datatype 

    vm.processData = (data) => {
    	// console.log(data)
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
    	// console.log(nestedData)
    	return nestedData
    }

    vm.getForecast = () => {
    	let forecast = {};
    	let current = {};

    	setCurrent = (response) => {
    		current = response;
	    }
	    setForecast = (response) => {
	    	forecast = response.list;
	    }

    	$q.all([ 
    		api.fetchCurrent($rootScope.zip).then(setCurrent),
    		api.fetchForecast($rootScope.zip).then(setForecast) 
    	])
	    .then((response) => { 
	    	vm.weatherObj = vm.processData(current, forecast);
	    })
	    .catch((err) => {
	    	console.log(err)
	    })
    }
 	 
    vm.getForecast();
	}
})(window.angular);
