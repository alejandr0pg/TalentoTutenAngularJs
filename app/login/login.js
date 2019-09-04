'use strict';

angular.module('myApp.login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'login/login.html',
    controller: 'loginCtrl',
    resolve : {
      'guest' : function(authService){
          return authService.guest();
      }
    }
  });
}])

.controller('loginCtrl', function($scope, authService, storageService, $location) {
    const vm = $scope;

    vm.email = 'testapis@tuten.cl';
    vm.password = '1234';

    vm.login = function() {
      authService.login(vm.email, vm.password).then((response) => {
        console.log('response-login', response);
        if(response.status === 200) {
          storageService.set('currentUser', response.data);
          $location.path('/booking');
        }
      });
    }
});