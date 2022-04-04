(function () {
    'use strict'; 

    // CAUTION: Like it said in the instructions, we should only inject the service into the data module parts, NOT into the MenuApp module parts of the project
    angular.module('data')
        .service('MenuDataService', MenuDataService);
    
    MenuDataService.$inject = [$http];  
    function MenuDataService($http){
        var mdservice = this; 

        mdservice.getAllCategories = function() {
            console.log("MenuDataService getAllCategories was called."); 
        };

        mdservice.getItemsForCategory = function (categoryShortName) {
            console.log("MenuDataService getItemsForCategory was called.");
            return categoryShortName;
        };
    };
})(); 