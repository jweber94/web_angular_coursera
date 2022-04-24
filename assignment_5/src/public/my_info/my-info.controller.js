( function() {
    "use strict";

    angular.module('public')
    .controller('MyInfoController', MyInfoController);

    MyInfoController.$inject = ['ServerRequest'];
    function MyInfoController (ServerRequest) {
        var ctrl = this; 
        ctrl.valid = ServerRequest.valid;
        
        ctrl.favMeal = ServerRequest.get_meal();
        ctrl.name = ServerRequest.name;
        ctrl.lastName = ServerRequest.lastName;
        ctrl.email = ServerRequest.email;
        ctrl.phone = ServerRequest.phone;

        ctrl.shortname = ServerRequest.req_shortname; 
    }
    
})();