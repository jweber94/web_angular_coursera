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
                templateUrl: 'src/categories/templates/main_categories_template.html',
                controller: 'CategoriesController as catCtrl', 
                resolve: { 
                    categorieItems: ['MenuDataService', function (MenuDataService) {
                            return MenuDataService.getAllCategories(); 
                        }
                    ]
                } 
            });

            //.state('');

    };
})(); 