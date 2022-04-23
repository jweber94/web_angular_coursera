(function() {
"use strict";

angular.module('common', [])
.constant('ApiPath', 'https://davids-restaurant.herokuapp.com') // TODO: Change this to my self hosted backend
.config(config);

config.$inject = ['$httpProvider'];
function config($httpProvider) {
  $httpProvider.interceptors.push('loadingHttpInterceptor');
}

})();
