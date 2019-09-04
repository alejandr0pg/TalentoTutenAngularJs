'use strict';

angular.module('myApp.booking', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/booking', {
    templateUrl: 'booking/booking.html',
    controller: 'bookingCtrl'
  });
}])

.controller('bookingCtrl', [function() {

}]);