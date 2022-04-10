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
                            return MenuDataService.getAllCategories()
                                .then( function(response) { 
                                    return response.data;}
                                , function(error) {
                                    console.log("Error in server request for the categories.");
                                }
                            ); 
                        }
                    ]
                } 
            })

            .state('catItems', {
               url: '/categories/{categoryName}',
               templateUrl: 'src/categories/templates/items_template.html',
               controller: 'CategorieDetailController as CatDetailCtrl',
               resolve: {
                   categorieItems: ['$stateParams', 'MenuDataService', 
                       function($stateParams, MenuDataService) {
                           return MenuDataService.getItemsForCategory($stateParams.categoryName)
                            .then(function(response) { 
                                return response.data; 
                            }, 
                            function(error) {
                                console.log("Error while requesting the categorie details for short_name=", $stateParams.categoryName); 
                            });
                       }]
               }
            });

    };
})(); 