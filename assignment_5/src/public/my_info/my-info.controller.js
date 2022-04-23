( function() {
    "use strict";

    angular.module('public')
    .controller('MyInfoController', MyInfoController);

    MyInfoController.$inject = ['ServerRequest'];
    function MyInfoController (ServerRequest) {
        var ctrl = this; 
        //ctrl.valid = false;
        ctrl.valid = ServerRequest.valid;
        
        ctrl.favMeal = ServerRequest.fav_meal;
        ctrl.name = 'Jens';
        ctrl.lastName = 'Weber';
        ctrl.email = 'jens@mail.com';
        ctrl.phone = '01234567';
    }
    
})();