(function(){
    'use strict';
    
    angular.module("LunchCheck", [])
        .controller("LunchCheckController", LunchCheckController); 
        
        LunchCheckController.$inject = ['$scope'];
        function LunchCheckController ($scope){
            $scope.evaluated_data = "";

            $scope.eval_user_input = function(){
                // on click we need to process the input_data variable
                var splitted_str;
                if ($scope.input_data == null) {
                    $scope.evaluated_data = "Please enter data first";
                    return; 
                }
                splitted_str = $scope.input_data.split(",");
                console.log(splitted_str);
                if ((splitted_str.length > 0) && (splitted_str.length <= 3) && splitted_str[0] != "") {
                    $scope.evaluated_data = "Enjoy!";
                    return; 
                } else if (splitted_str.length >= 4) {
                    $scope.evaluated_data = "Too much!";
                    console.log("DEBUG 2");
                    return;
                } else {
                    $scope.evaluated_data = "Please enter data first";   
                    return;
                }
            }
        };
    }
)();
