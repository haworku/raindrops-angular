(function (angular) {
  angular.module('theApp')
    .controller('ForecastController', ForecastController);

  ForecastController.$inject = ['$rootScope', '$scope', '$location', '$q', 'moment', 'api'];

  function ForecastController($rootScope, $scope, $location, $q, moment, api) {
    let vm = this;
    vm.weather = {}; 
    vm.current = {};
    vm.forecast = {};

    vm.processData = (current,forecast) => {; 

    	let nestedData = {
    		now:  { 
    			summary: current.weather[0].description,
    			icon: `http://openweathermap.org/img/w/${ current.weather[0].icon }.png`,
					temp: current.main.temp,
				},
				today: {
					date: moment(),
    			summary: forecast[0].weather[0].description,
    			icon: `http://openweathermap.org/img/w/${ forecast[0].weather[0].icon }.png`,
    			temp: forecast[0].temp.day,
					max: forecast[0].temp.max,
					min: forecast[0].temp.min
				},
				one:  { 
					date: moment().add(1, 'days'),
    			summary: forecast[1].weather[0].description,
    			icon: `http://openweathermap.org/img/w/${ forecast[0].weather[0].icon }.png`,
    			temp: forecast[1].temp.day,
					max: forecast[1].temp.max,
					min: forecast[1].temp.min
				},
				two:  { 
					date: moment().add(2, 'days'),
    			summary: forecast[2].weather[0].description,
    			icon: `http://openweathermap.org/img/w/${ forecast[0].weather[0].icon }.png`,
    			temp: forecast[2].temp.day,
					max: forecast[2].temp.max,
					min: forecast[2].temp.min
				},
				three:  { 
					date: moment().add(3, 'days'),
    			summary: forecast[3].weather[0].description,
    			icon: `http://openweathermap.org/img/w/${ forecast[0].weather[0].icon }.png`,
    			temp: forecast[3].temp.day,
					max: forecast[3].temp.max,
					min: forecast[3].temp.min
				},
				four:  { 
					date: moment().add(4, 'days'),
    			summary: forecast[4].weather[0].description,
    			icon: `http://openweathermap.org/img/w/${ forecast[0].weather[0].icon }.png`,
    			temp: forecast[4].temp.day,
					max: forecast[4].temp.max,
					min: forecast[4].temp.min

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

    	return (nestedData);
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
	    	vm.weather = vm.processData(current, forecast);
        // console.log(vm.weather)
	    })
	    .catch((err) => {
	    	console.log(err)
	    })
    }
 	 
    vm.getForecast();
	}
})(window.angular);
