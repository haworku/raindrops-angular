(function (angular) {
  angular.module('theApp')
    .controller('ForecastController', ForecastController);

  ForecastController.$inject = ['$location'];

  function ForecastController($location) {
    let vm = this;
}
})(window.angular);
