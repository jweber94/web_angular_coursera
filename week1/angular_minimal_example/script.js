(function() {
  'use strict'; // makes variable declarations explicit (if a variable is not explicitly defined, the interpreter will return an error)
  // IFEE
  angular.module('myFirstApp', [])
  // (Name of the application, array of dependencies of the module
  // The name of the angular application needs to be bound to the corresponding html tag for
  // which it is responsible from the start tag until the end tag and for everything that is
  // contained in it
    .controller('myFirstController', function($scope) {
      $scope.name="Jens";
      $scope.sayHello = function() {
          return "Hello Jens";
        }
    });
}
)();
