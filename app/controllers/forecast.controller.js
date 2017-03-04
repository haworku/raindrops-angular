(function (angular) {
  angular.module('theApp')
    .controller('ForecastController', ForecastController);

  ForecastController.$inject = ['$rootScope', '$scope', '$location', '$q', 'moment', 'api'];

  function ForecastController($rootScope, $scope, $location, $q, moment, api) {
    let vm = this;
    vm.weatherObj = {}; 
    vm.current = {};
    vm.forecast = {};

    vm.processData = (current,forecast) => {
    	let dates = {
    		one: moment().add(1, 'days'),
    		two: moment().add(2, 'days'), 
    		three: moment().add(3, 'days'),
    		four: moment().add(4, 'days'),
    		five: moment().add(5, 'days'),
    	}

    	let nestedData = {
    		now:  { 
    			summary: current.weather[0].description,
    			icon: `http://openweathermap.org/img/w/${ current.weather[0].icon }.png`,
					temp: current.main.temp,
				},
				today: {
					date: moment(vm.today).format('dddd, MMMM Do YYYY'),
    			summary: forecast[0].weather[0].description,
    			icon: `http://openweathermap.org/img/w/${ forecast[0].weather[0].icon }.png`,
    			temp: forecast[0].temp.day,
					max: forecast[0].temp.max,
					min: forecast[0].temp.min
				},
				one:  { 
					date: moment(dates.one).format('dddd, MMMM Do YYYY'),
    			summary: forecast[1].weather[0].description,
    			icon: `http://openweathermap.org/img/w/${ forecast[0].weather[0].icon }.png`,
    			temp: forecast[1].temp.day,
					max: forecast[1].temp.max,
					min: forecast[1].temp.min
				},
				two:  { 
					date: moment(dates.two).format('dddd, MMMM Do YYYY'),
    			summary: forecast[2].weather[0].description,
    			icon: `http://openweathermap.org/img/w/${ forecast[0].weather[0].icon }.png`,
    			temp: forecast[2].temp.day,
					max: forecast[2].temp.max,
					min: forecast[2].temp.min
				},
				three:  { 
					date: moment(dates.three).format('dddd, MMMM Do YYYY'),
    			summary: forecast[3].weather[0].description,
    			icon: `http://openweathermap.org/img/w/${ forecast[0].weather[0].icon }.png`,
    			temp: forecast[3].temp.day,
					max: forecast[3].temp.max,
					min: forecast[3].temp.min
				},
				four:  { 
					date: moment(dates.four).format('dddd, MMMM Do YYYY'),
    			summary: forecast[4].weather[0].description,
    			icon: `http://openweathermap.org/img/w/${ forecast[0].weather[0].icon }.png`,
    			temp: forecast[4].temp.day,
					max: forecast[4].temp.max,
					min: forecast[4].temp.min

				},
				five:  { 
					date: moment(dates.five).format('dddd, MMMM Do YYYY'),
    			summary: forecast[5].weather[0].description,
    			icon: `http://openweathermap.org/img/w/${ forecast[0].weather[0].icon }.png`,
    			temp: forecast[5].temp.day,
					max: forecast[5].temp.max,
					min: forecast[5].temp.min
				}
			}

    	console.log(nestedData);
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
