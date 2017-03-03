(function (angular) {
  angular.module('theApp')
    .controller('WelcomeController', WelcomeController);

  WelcomeController.$inject = ['$location','$route','$routeParams'];

  function WelcomeController($location, $route, $routeParams) {
    let vm = this;
  }
})(window.angular);
