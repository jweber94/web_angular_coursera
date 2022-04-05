(function () {
    'use strict'; 

    // CAUTION: Like it said in the instructions, we should only inject the service into the data module parts, NOT into the MenuApp module parts of the project
    angular.module('data')
        .service('MenuDataService', MenuDataService);
    
    MenuDataService.$inject = ['$http'];  
    function MenuDataService($http){
        var mdservice = this; 

        // Helper function
        mdservice.extractCategoryData = function (serverCatData) {
            var resulting_categories = []; 
            for (var i = 0; i < serverCatData.length; i++){
                resulting_categories[i] = serverCatData[i].name;
            }
            return resulting_categories;
        };

        mdservice.getAllCategories = function() { 
            return $http({                                          // defining the http request
                method: "GET",
                url: "https://davids-restaurant.herokuapp.com/categories.json"
            })
            .then( function(response) {                         // processing the response(-promise) from the server
                var foundItems = mdservice.extractCategoryData(response.data); // converts the body of the response automatically into javascript object in case of json data 
                return foundItems; 
            }, function(error){
                console.log("ERROR: Something went wrong! Please contact the developer.");
            });
        };

        mdservice.getItemsForCategory = function (categoryShortName) {
            console.log("MenuDataService getItemsForCategory was called.");
            return categoryShortName;
        };
    };
})(); 