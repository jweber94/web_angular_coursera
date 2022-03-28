( function(){
    'use strict';
    
    angular.module("NarrowItDown", []) // create app aka module
        .controller("NarrowItDownController", NarrowItDownController) // create the controller and associate the controller function with it
        .service("MenuSearchService", MenuSearchService)
        .directive("foundItems", foundItems); // found-items as HTML-tag (normalized name)

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
    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService){
        var nidController = this; 
        
        nidController.found = []; // list that is associated in the index.html
        nidController.narrowOnClick = function(){
            nidController.found = []; // reset list on every new request
            if (nidController.given_search_term === "") {
                return; 
            }
            var prom = MenuSearchService.getMatchedMenuItems(nidController.given_search_term); // input the search term from the HTML page 
            prom
                .then(function(response){
                    for (let i = 0; i < response.length; i++){
                        nidController.found.push(response[i]); // delivers the result to the scope of the next higher angular scope
                    }
                })
                .catch(function(error){
                    console.log("ERROR: An error occured during processing.");
                });
        };

        nidController.removeItem = function(itemIndex) {
            nidController.found.splice(itemIndex, 1);
        };
    };

    // Directive Definition Objects (DDOs)
    function foundItems() {
        // factory function 
        var ddo = {
            templateUrl: 'src/items_template.html', 
            scope: {
                foundElements: '<', // binding the list (handed over variables) from the controller to the directive 
                onRemove: '&' // reference binding to the function that is handed over in the index.html to the on-remove parameter of the self-defined <found-items></found-items> HTML tag 
            },
            controller: NarrowItDownController, 
            controllerAs: 'nidList', // alias of controller within the DDO template
            bindToController: true
        };
        return ddo; // returns the Directive Definition Object in order to let the AngularJS compiler know how to interpret/compile the associated HTML tag
    };

})(); 