# Notes Week 5

## Form validation with AngularJS
+ Lecture 42 part 1 defines how we can define a form with angular and Lecture 42 part 2 shows an implementation example. 
    - Important: Javascript / the browser has a build-in form validator. In order to let angular do the form validation we need to disable the native form validation by assigning the `<form>` HTML tag the `novalidate` attribute.
    - The actual validation rules are then defined on the `<input>` elements inside the form.  
        * Example: 
[](images/angular_form_validation.png)
+ We can associate angular controllers and therefore self-written functionallities based on the form (and/or on the submit-button click) 

## Unit Testing
+ Unit Testing = 
    - Independent checking for proper operation of the smallest testable part of an application
    - Happens in an isolated environment from the rest of the system
    - Only the tested part is validated by the test (no system quality assurance)
+ The tested functionallity needs to have just one purpose --> loose coupling
+ Unit Tests need to be repeatable
    - For regression testing
+ Implement unit tests forces us to write smaller chunks of functionallity and therefore our code gets much more readable!
    - _Writing unit tests is always a good thing!_

### Mocking
+ Technique where dependency and its behaviour is imitated (or faked)
    - This is done by the developer OR by a mocking library
    - E.g. mocking the `$http` Service and deliver a mocked response such that we can test our code independend of the existance of the server (the network availablitity or the validity of the URL)
### Jasmine: Javascript framework for testing angular components
+ Lecture 43 part 1 (theory) and Lecture 43 part 2 (implementation example)
+ The approach that is used in jasmine is called "Behaviour driven development" (BDD)
+ Jasmine needs to be placed into a folder and your code that you need to test is then inserted in a defined manner to the folder.
    - How you do this is described in the lectures
+ The `beforeEach()` jasmine function is executed before every unit test is executed. 
    - If you define more then one `beforeEach` functions, _ALL_ of them will be executed before the actual test starts
    - If we want to test angular controllers, we need to define the `module('ModName')` within the `beforeEach` function!
        - Also we can define a mock function
    - Angular has a `angular.mock.inject` method for injecting mock functions
+ ***Testing controllers with the angular API for mocking services is described in Lecture 44 part 4***
    - Done with the `$controller` service to instanciate the controller that we want to test
### AngularJS and mocking `$http` service calls
+ Angular is able to mock network requests with built-in functions
+ See Lecture 45 part 1 for theory and Lecture 45 part 2 for an implementation example
    - ***The needed angular service is the `$httpBackend` service!***
        * The `$httpBackend.flush()` at the end of the test definition makes it possible to make the test run synchronously while testing asynchronous behaviour and preserving the integrity of the test itself (since running an asynchronous call synchronously will destory the tests integrity)

## Testing AngularJS directives
+ Since directives are used in multiple places in the application it is important to test them!
+ Since angular processes / transpiles our html definitions and interpolations, we need to do this on our own if we want to test a directive. Therefore, angular provides the `$compile` service. 
    - Theory: Lecture 46 part 1
    - Implementation example: Lecture 46 part 2
+ Since angular does asynchronous rendering calls behind the scenes for the rendering of the directives, we need to work around this because we do want to execute our tests in a synchronous manner!
    - The idea behind this is to make a synchronous basic AJAX call to the HTML-template for the directive and then store it into the `$templateCache` service of angular. 

## Testing AngularJS components
+ As well as directives, angular components are also reused though out the application and therefore it is a good idea to implement unit tests for it!
+ See Lecture 47 part 1 for theory and Lecture 47 part 2 for an implementation example

# Tipps by implementing the restaurant website
+ `ng-strict-di` attribute on the same HTML tag that the ng-app (aka angular module) is defined on
    - Security feature such that no object can be injected by angular that are not protected before minimization (aka is using the inject syntax in order to inject objects to other angular objects.)
+ The `<ui-view>` tag of UI-router will display whatever is defined between the opening and the closing tag if no UI-route is requested to get displayed  
+ UI-router states - State definition as `abstract: true`
    - Used in the `public.routes.js` file
    - A state that has an abstract state set to true has ***NO*** url to call it and it says that we could not go directly to that state!
        * It is like an abstract parent (-class) state (like an abstract base class in C++) which defines some properties for its child classes
        * In an angular UI-router state, the `templateUrl` will define a HTML template that calls a `<ui-router>` tag in it to which the child states will inject their templateUrls or template HTML definitions! 
+ Angular modules:
    - Are used to encapsulate functionallities and separate the code into functional, coherent blocks
    - A module could be injected as a dependency into other modules. If we do that, we can use the functions that are defined on the injected module in the aimed module. 
+ `$httpProvider` and interceptors
    - Interceptors could be defined as an object literal on the module that is using the http requestor service `$http`
    - ***A `httpProviderInterceptor` needs to be defined as an angular factory!***
    - It needs to explicitly reject errornous responses from the `$httpProvider`
    - See Lecture 53 for more details!
+ In order to reuse variables through out the code, we can define angular constants on a module. 
    - In order to do this, we need to define a module and then add a `.constant('ConstName', 'ConstVal')` on it
    - We can use that constant by using the `ConstName` whereever we need it in our javascript/AngularJS code
    - See Lecture 54 for details
```
angular.module('common', [])
    .constant('ApiPath', 'https://test.com');
```
+ Best debugging practice with angular services: 
    - Interpolating the output of a service on the html page to see what its giving us back. 
    - Like in Lecture 55 at the end