# Lessons Learned from homework Week 3

## AngularJS Services
+ Reference: Lecture 24 ff
+ Services are used for asynchronous behaviour and replaces the callback approach
    - Callbacks are ugly to implement if they are nested or if they need to deliver their result to a higher scope then the one where the callback was called
+ Services are the concrete implementation of the Promise API 
    - Promise is part of ES6 Javascript standart but also part of AngularJS (which implements its own Promise API)
    - Promises are called throu the `$q` service of angular
    - Construction: 
    [](images/angular_asyn_service_with_promise_api.png)
+ The deferred object (created by `var deferred = $q.defer();`) contains all elements that are needed to execute something asynchronously
+ The `$http` service of angular is per se asynchronous (like the most http librarys out there) 
    - We need to process the resulting promise object 
    - If we receive a body in the server HTTP response that is in JSON format, angular will convert the body automatically into a javascript object if you call `var json_obj = response.data;`

## Directives
+ Directives are Javascript/AngularJS code that is able to create your _own HTML tags_ and insert them _dynamically_ into your static HTML page!
    - AngularJS ***compiles*** the HTML code that you have written with the instructions that you handed over to angular by defining your directive. The result of the compilation is the plain HTML code that your browsers HTML rendering engine is able to interpret. 
+ Definition: Directive
    "A Directive is a marker on the DOM that tells angulars HTML compiler to attach a specified behaviour to that DOM element"
+ The diretives factory function ***returns*** a DDO object and is executed _only once_ when the javascript code is interpreted
    - After that, the DDO is persistandly created and can be used by angular to transpile/compile the HTML code according to the DDO definition
    - The factory function is like the ***construction plan*** of an object that is defining how angular should transpile the (normlized) HTML tag that is associated with the factory function. 
+ The scope of the directive is the same as the scope of the superordinate controller  
+ In order to tell the angular compiler what should be placed into the custom directive tags, you need to use the _mandatory_ attribute
    - `template: <template_code>` 
    - `templateUrl: src/template.html`
    - By doing this, we can do "code reuse" inside the html document!
+ Explaination `controllerAs` attribute of the DDO: https://stackoverflow.com/questions/31838265/what-can-be-the-reason-to-use-controlleras-property 