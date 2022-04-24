( function() {
    "use strict";

    angular.module('public')
    .controller('SignupFormController', SignupFormController);

    SignupFormController.$inject = ['ServerRequest'];
    function SignupFormController(ServerRequest) {
        var $ctrl = this;

        $ctrl.formSubmitted = false; 
        $ctrl.invalidForm = false;  
        $ctrl.request_finished = false;  

        $ctrl.submitForm = function(firstName, lastName, email, phone, favdish) {
            // check if the form has completly validated
            if (firstName === undefined || lastName === undefined || email === undefined || phone === undefined || favdish === undefined) {
                $ctrl.invalidForm = true;
                return; 
            } 

            $ctrl.fav_meal_Data;  
            ServerRequest.get_fav_meal(favdish).then(
                function(response) {
                    $ctrl.fav_meal_Data = response.data;
                    $ctrl.fav_meal_data_name = response.data['name'];
                    $ctrl.request_finished = true;
                    if ($ctrl.fav_meal_data_name !== undefined && $ctrl.request_finished) {
                        ServerRequest.set_meal($ctrl.fav_meal_data_name, favdish); 
                    }
                }, 
                function (error) {
                    console.log("ERROR: Could not interact with the server. Please contact the developer."); 
                }
            );
            
            $ctrl.formSubmitted = true;
            ServerRequest.name = firstName;
            ServerRequest.lastName = lastName; 
            ServerRequest.email = email; 
            ServerRequest.phone = phone; 
        };
    }

})();