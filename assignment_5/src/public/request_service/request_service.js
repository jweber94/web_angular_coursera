(function() {
    "use strict";

    angular.module('public')
    .service('ServerRequest', ServerRequest);
    
    ServerRequest.$inject = ['$http', 'ApiPath'];
    function ServerRequest($http, ApiPath) {
        var req_serv = this;  
        req_serv.valid = false; 
        req_serv.req_shortname = "";
        req_serv.name = ""; 
        req_serv.lastName = "";
        req_serv.email = ""; 
        req_serv.phone = ""; 

        req_serv.get_fav_meal = function(shortname) { 
            var response_obj = $http({
                method: "GET",
                url: ApiPath + "/menu_items/" + shortname + ".json"
            });
            return response_obj;
        };

        req_serv.set_meal = function(meal_name, shortname) {
            req_serv.fav_meal = meal_name;
            req_serv.req_shortname = shortname; 
            req_serv.valid = true;  
        }; 

        req_serv.get_meal = function() {
            return req_serv.fav_meal; 
        };  
    }
})(); 