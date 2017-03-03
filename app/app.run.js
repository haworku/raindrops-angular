 (function (angular) {
  angular
    .module('theApp')
    .run(Run);

  Run.$inject = [];

  function Run() {
    console.log('run!');
  }
})(window.angular);
