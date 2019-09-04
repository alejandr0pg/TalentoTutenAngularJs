'use strict';

angular.module('myApp.booking', ['ngRoute', 'datatables'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/booking', {
    templateUrl: 'booking/booking.html',
    controller: 'bookingCtrl',
    resolve : {
      'auth' : function(authService){
          return authService.authenticate();
      }
    }
  });
}])

.controller('bookingCtrl', function($scope, storageService, $http, authService, api) {
  const vm = $scope;

  vm.dtInstance = {};

  vm.user = storageService.get('currentUser');
  vm.token = vm.user.sessionTokenBck;
  vm.email = "contacto@tuten.cl";

  const headers = {
    'Content-Type':'application/json; charset=utf-8',
    'app': 'APP_BCK',
    'adminemail': vm.user.email,
    'email': vm.email,
    'token': vm.token
  };

  $http.get(`${api.url}/user/${vm.email}/bookings?current=true`, { headers: headers })
    .then(response => {
      console.log('respones-booking', response);
      if(response.status === 200) {
        vm.bookings = response.data.map((array) => {
          const cliente = array['tutenUserClient'];
          array['nameClient'] = cliente['firstName'] + ' ' + cliente['lastName'];
          return array;
        });

        vm.dtInstance.reloadData(()=>{}, true);
      }
    });


  vm.logout = function() {
    authService.logout();
  }
});