( function() {
    "use strict";

    angular.module('public')
    .controller('SignupFormController', SignupFormController);

    SignupFormController.$inject = ['ServerRequest'];
    function SignupFormController(ServerRequest) {
        var $ctrl = this;

        $ctrl.formSubmitted = false; 
        $ctrl.savingSuccessful = false;
        $ctrl.invalidForm = false;  
        
        $ctrl.submitForm = function(firstName, lastName, email, phone, favdish) {
            // check if the form has completly validated
            if (firstName === undefined || lastName === undefined || email === undefined || phone === undefined || favdish === undefined) {
                $ctrl.invalidForm = true;
                return; 
            }

            $ctrl.invalidForm = false; 
            $ctrl.formSubmitted = true;
            if (ServerRequest.get_fav_meal(favdish)) {
                console.log("Weiter gegangen"); 
                $ctrl.savingSuccessful = true;
                ServerRequest.name = firstName;
                ServerRequest.lastName = lastName; 
                ServerRequest.email = email; 
                ServerRequest.phone = phone; 
            }
        };
    }

})();