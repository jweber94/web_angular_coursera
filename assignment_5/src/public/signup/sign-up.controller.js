( function() {
    "use strict";

    angular.module('public')
    .controller('SignupFormController', SignupFormController);

    SignupFormController.$inject = ['$http'];
    function SignupFormController($http) {
        var $ctrl = this;
        
        $ctrl.submitForm = function(firstName, lastName, email, phone, favdish) {
            console.log("Hello World!");
            console.log(firstName);
            console.log(lastName);
            console.log(email);
            console.log(phone);
            console.log(favdish);
            console.log("Finished processing!");
        };
    }

})();