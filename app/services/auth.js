'use strict';

angular.module('myApp')

.factory('authService', function($q, $http, $location, api, storageService){
    return {
        isAuthenticated: function() {
            return storageService.get('currentUser') ? true : false;
        },
        authenticate : function(){
            if(this.isAuthenticated){
                return true;
            } else {
                return $q.reject('Not Authenticated');
            }
        },
        guest : function(){
            if(!this.isAuthenticated){
                return true;
            } else {
                return $q.reject('Is Authenticated');
            }
        },
        login: function(user, pass) {
            const headers = {
                'Content-Type':'application/json; charset=utf-8',
                'app': 'APP_BCK',
                'email': user,
                'password': pass
            };

            return $http.put(`${api.url}/user/${user}`, {}, { headers: headers })
        },
        logout: function() {
            storageService.clear();
            // redirigir
            $location.path('/');
        }
    }
});