# Week 2 Notes

## Asynchronous behaviour and promises
+ Before we had promises, we just could work with callbacks. But callbacks make it hard to deliver back a result to the caller of the callback
+ If we have nested asynchronous calls, the resulting code will be very hard to read
    - Especially if we have some exception handling in it
+ AngularJS implements its own promise API!
## What is a promise?
+ Promise = "A promise is an object which can be passed around or returned that holds references to the outcome of asynchronous behaviour"
+ Promises are created in angular with the `$q` service
### Promises in AngularJS
+ A variable that is initialized with the `$q.defer();` object is called a promise
    - The `.defer()` method initializes the asynchronous execution of the after defined code!
    - The variable has the methods 
        * `varname.resolve(result);`: Marks the promise with successful completion and wraps the data for it
        * `varname.reject(error);`: Marks unsuccessful completion and wraps the data for the promise
        * `return varname.promise;`: Returns the promise object to the function caller (CAUTION: The function is an asynchronous function!)
+ In order to get the promise from your asynchronous function, we need to assign the result of the asynchronous function to a variable in your calling javascript script. 
    * `var prom = asyncFnc();`
+ The promise object that is returned by the asynchronous function has a ***chainable*** `.then` method which can be used to assign a function that is executed when the promise returns a value
    * CAUTION: The `.then(function on_success(){}, function on_error(){});` takes two arguments. The first one for defining the successful execution of the asynchronous function and the second as the error handling function!
+ CAUTION: The `.then(...)` function returns a promise on its own and is therefore chainable!
+ The promise service has a `$q.all()` method that is used to handle all promises in one `then` function handling 
+ Promises has the possibiliy to propagate errors to the next `.then()` method. Therefore we do NOT need to nest a lot of `then` methods with two arguments. 
    - The result of the first error is then passed to the sequentially listed second `then` method. 
    - If no error handling is implemented, you can catch ***all*** errors by using the `.catch(function (){});` method of the promise object of angular. 
    - Via the `.all` method we are able to handle all promises in one place in our code! 
+ Promise API by javascript is currently very now and not supported by most browsers yet

## HTTP service in AngularJS: `$http`
+ Http service is based on promises, since HTTP is always handled asynchronously in AngularJS
+ A call of the http service of angular returns a promise that needs to be processed by us in order to utilize the result of the http response
+ The http service is a function basically that returns a promise!
    - No http object can be created from it!
[](images/basic_angular_http_service_call.png)
    - There are more then just the params: parameter - you can look them up in the AngularJS documentation!
+ If you want to access the data of a promise, you need to call the `prom.data` attribute of the promise object! This holds for the response object (which is a promise object) that is returned by the `$http` service as well as for _normal_ promises.
[](images/usage_http_service_angular.png)
### Common mistake: 
+ Not thinking asynchronous - we could not assign a value that is defined by the asynchronous function squentially after we started the asynchronous function!
[](images/async_processing_error.png)
Fix:
[](images/async_error_fix.png)
## Best Practice AJAX calls 
+ In order to reuse the URL for some endpoints, you can add a `.constant('nameInCode', 'http://test.com')` at the `angular.module('ModNmae', []).controller('myController', controllerFncPtr).constant('urlName', 'https://www.myUrl.com');`
    - Then we can inject the constant to the individual function and use the url path string literal there. 
        * See lecture 25 part 2 example on the github repository of the course. 

# Directives: Dynamic HTML
+ Directives are the main reason why we want to use AngularJS!
    - "Why angular?"
        * "HTML is great for declaring static documents, but it falters when we try to use it for declaring dynamic views in web applications. AngularJS lets you extend HTML vocabulary for your application. The resulting environment is extraordinarily expressive, readable and quick to develop."
    - That means we can define our own HTML tags and in your Javascript/Angular code, we will define how to translate your self created tag to a standard HTML tag
    - Once angular/your javascript code sees an attached `ng-app` in your HTML code, angular has access to the complete DOM of the underlying HTML code and can parse and change it. 
        - The changing is done while loading the page
        - In angular the process of changing HTML code is called "compilation"!
+ What is a directive?
    - "A directive is a marker on a DOM element that tells Angular's HTML compiler to attach a specified behavior to that DOM element."
        * The compiler can even transform/change the DOM elements AND its children!
        
## Construction of a directive
[](images/directive_declaration.png)
+ The DDO (Directive Definition Object) is a function that tells the angular HTML compiler how to process a self defined HTML tag (aka the "normalized name")
    - ***Normalized Name*** = myTag is the HTML tag `my-tag`
        * CamelCases will be changed into dashed tags with lowercased letters
+ See slides Lecture 26 for more details how to implement the javascript code!
+ Caution: The scope of a directive is the same as the scope of the calling angular controller!
    - Unless defined otherwise
+ Directives are especially good if your HTML code is repeated mutliple times. Then you can define one directive that is written out much shorter in the HTML page then the HTML code that is used within the directive
    - This is a possibility to make your HTML much more "Don't repeat yourself" like! ==> Code Reuse!
    - Implementation example in Lecture 26 examples
    - Instead of using the `template:` attribute for defining what the HTML compiler should insert into the custom HTML directive tag, you can use `templateUrl:` and hand over a path to a html file that is inserted instead of the custom tag.
+ The function in a directive declaration is the "factory function" that is used within the ddo
+ The compiled HTML tags are dashed but they do not need to be lowercased after the dash!
    - `<my-tag></my-tag>` is as valid as `<my-Tag></my-Tag>`
### `restrict` property on DDOs
 + The `restrict` attribute of an angular DDO is used to define how angular should interpret the DDO. 
    - Either as an element or an attribute
+ If no `restrict:` property is used, the javascript / angular interpreter will interpret the DDO as `restrict: 'AE'` which means that it could be interpreted as an element as well as an attribute!
+ If you use a directive that is restricted as a type that is not allowed (since it is not in the list after the `restricted` attribute), it will be ignored by the angular html compiler (and probably also by the HTML renderer of your browser)
+ ***Best practice:*** 
    * Use `restrict: 'E'` when the directive has content along with possible behavior
    * Use `restrict: 'A'` for attribute when directive has no content and only extends the behavior of the host element
        - 'E' = Element
        - 'A' = Attribute
## Isolated scopes for AngularJS directives
+ If we declare a directive, the scope of the controller where the directive is used is the same as the scope of the directiv (and therefore have the same variables throu `$scope` accessable in it).
+ If we want to isolate the directives scope from the scope of the controller, we can add the `scope: {}` attribute to the DDO object. 
+ The mostly used scope binding is _bidirectional_ binding: By doing bidirectional binding, a change in one place (within the directive OR within the controller scope) will change both values
[](images/bidirectional_binding.png)
    - If we do not assign a variable name after the `=` operator, AngularJS will assume that the name of the variable within the directive is the compiled (and therefore dashed) version in the HTML document. 
    - Usage: 
[](images/usage_bidirectional_binding.png)

+ If we use the `@` operator means that we want to interpret the given attribute as a string literal. 
    - By doing this, the outter value will change the inner value but if the value within the directives changes, the outter value will not change!
    - We can use concatination and interpolation for the RHS of the attribute for the directive
    - See Slides Lecture 28 for example syntax
## Controllers inside directives
+ We can declare a controller function on a ddo object
    - The `$scope` service of the controller function holds all attributes that are available within the directive that it is associated with it 
+ Example: Lecture 29