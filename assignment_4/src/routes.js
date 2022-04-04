(function() {
    'use strict';

    angular.module('MenuApp')
        .config(RoutesConfig);
        
    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider']; // TODO: Check what these services are used for
    function RoutesConfig ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        // Define states
        $stateProvider
            .state('home', {
              url: '/',
              templateUrl: 'src/categories/templates/home_template.html'
            })

            .state('categories', {
                url: '/categories',
                templateUrl: 'src/categories/templates/categories_template.html'
            });

            //.state('');

    };
})(); 