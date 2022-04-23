(function() {
    "use strict";

    angular.module('public')
    .service('ServerRequest', ServerRequest);
    
    ServerRequest.$inject = ['$http', 'ApiPath'];
    function ServerRequest($http, ApiPath) {
        var req_serv = this; 
        req_serv.valid = false; 
        req_serv.name = ""; 
        req_serv.lastName = "";
        req_serv.email = "";
        req_serv.phone = "";

        req_serv.get_fav_meal = function(shortname) {
            // TODO: Do http request
            
            if (shortname === "A1") {
                req_serv.valid = true; 
                req_serv.fav_meal = 'Cookies';
                return true; 
            }

            return false; 
        }
    }

})(); 