'use strict';

// Declare app level module which depends on views, and core components
angular.module('myApp', [
  'ngRoute',
  'myApp.login',
  'myApp.home',
  'myApp.booking'
])
// Configuración del $routerProvider
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');
  $routeProvider.otherwise({redirectTo: '/'});
}])
// Redirigir en caso de error
.run(function($rootScope, $location){
  $rootScope.$on('$routeChangeError', function(event, current, previous, rejection){
      console.log('rejection', rejection);
      if(rejection === 'Not Authenticated'){
          $location.path('/');
      }

      if(rejection === 'Is Authenticated'){
          $location.path('/booking');
      }
  })
})
// Config datatables
.run(function(DTDefaultOptions){
  DTDefaultOptions
    .setDisplayLength(10)
    .setBootstrapOptions({
        TableTools: {
            classes: {
                container: 'btn-group',
                buttons: {
                    normal: 'btn btn-danger'
                }
            }
        },
        ColVis: {
            classes: {
                masterButton: 'btn btn-primary'
            }
        }
    });

})
// API ENDPOINT
.constant('api', {
  url: 'https://dev.tuten.cl/TutenREST/rest'
});

