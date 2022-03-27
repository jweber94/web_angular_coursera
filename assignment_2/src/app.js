( function(){
    'use strict';
    
    angular.module("NarrowItDown", []) // create app aka module
        .controller("NarrowItDownController", NarrowItDownController) // create the controller and associate the controller function with it
        .service("MenuSearchService", MenuSearchService);

    // Service definitions
    MenuSearchService.$inject = ['$http']
    function MenuSearchService($http) {
        var service = this; 
        service.extractRequestedData = function (input_json, search_term) {
            var result_array = [];  
            for (let i = 0; i < input_json.menu_items.length; i++ ) {
                if (input_json.menu_items[i].description.toLowerCase().includes(search_term.toLowerCase())) {
                    result_array.push(input_json.menu_items[i]);
                } 
            }
            return result_array; 
        };

        service.getMatchedMenuItems = function (searchTerm) {
            return $http({                                          // defining the http request
                    method: "GET",
                    url: "https://davids-restaurant.herokuapp.com/menu_items.json"
                })
                .then( function(response) {                         // processing the response(-promise) from the server
                    var foundItems = service.extractRequestedData(response.data, searchTerm); // converts the body of the response automatically into javascript object in case of json data 
                    return foundItems; 
                }, function(error){
                    console.log("ERROR: Something went wrong! Please contact the developer.");
                });
        }; 
    };

    // Controller definitions
    NarrowItDownController.$inject = ['$scope', 'MenuSearchService'];
    function NarrowItDownController($scope, MenuSearchService){
        $scope.found = []; 
        $scope.narrowOnClick = function(){
            var prom = MenuSearchService.getMatchedMenuItems($scope.given_search_term); // input the search term from the HTML page 
            prom
                .then(function(response){
                    for (let i = 0; i < response.length; i++){
                        $scope.found.push(response[i]); // delivers the result to the scope of the next higher angular scope
                    }
                })
                .catch(function(error){
                    console.log("ERROR: An error occured during processing.");
                });
            console.log("The data is: ");
            console.log($scope.found);   
            // display the result on the HTML page 
        };
    };
})(); 