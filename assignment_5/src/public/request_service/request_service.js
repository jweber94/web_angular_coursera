(function() {
    "use strict";

    angular.module('public')
    .service('ServerRequest', ServerRequest);
    
    ServerRequest.$inject = ['$http', 'ApiPath', '$q'];
    function ServerRequest($http, ApiPath, $q) {
        var req_serv = this;  
        req_serv.name = ""; 
        req_serv.lastName = "";
        req_serv.email = "";
        req_serv.phone = "";
        req_serv.fav_meal = "";
        req_serv.valid = false;

        req_serv.get_fav_meal = function(shortname) { 
            console.log("Starte Anfrage mit: " + shortname);
            $http({
                method: "GET",
                url: ApiPath + "/menu_items/" + shortname + ".json"
            }).then(
                function successCallback(response) {
                    req_serv.fav_meal = response.data;
                    req_serv.valid = true;
                    console.log("DEBUG: " + response.data); 
                    defer.resolve(true);  
                }, 
                function errorCallback(error){
                    console.log("ERROR: Could not interact with the server. Please contact the developer."); 
                    defer.reject(); 
                }
            );

            // TODO: Wait until the http request has returned
            console.log("Jetzt kommt return");
            return true; 
        }

        req_serv.get_fav_meal_name = function() {
            if (req_serv.valid == true) {
                console.log("req_serv.fav_meal['name'] is: " + req_serv.fav_meal['name']);
                return req_serv.fav_meal['name'];
            }

            return "No valid favourite meal was found!"; 
        }

    }

})(); 