(function () {
    'use strict'; 

    // CAUTION: Like it said in the instructions, we should only inject the service into the data module parts, NOT into the MenuApp module parts of the project
    angular.module('data')
        .service('MenuDataService', MenuDataService);
    
    MenuDataService.$inject = ['$http'];  
    function MenuDataService($http){
        var mdservice = this; 

        mdservice.getAllCategories = function() { 
            var response = $http({
                method: "GET",
                url: "https://davids-restaurant.herokuapp.com/categories.json"
            });
            return response;
        };

        mdservice.getItemsForCategory = function (categoryShortName) {
            var requestURL = "https://davids-restaurant.herokuapp.com/menu_items.json?category=" + categoryShortName;
            return $http({
                method: "GET",
                url: requestURL
            });
        };
    };
})(); 