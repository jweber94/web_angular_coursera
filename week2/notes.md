# Week 2 Notes

## Filters in AngularJS
+ The filter service of javascript holds some predefined functions that could be invoked in our javascript code _OR_ from our HTML page using interpolation with the `{{ variableName | filterName: arg2, arg3 }}` syntax
    - If you are using it in the HTML page, the `variableName` needs to be defined at the `$scope.variableName = ...;` on the controller in the javascript file. 
        * If we use a custom filter in our HTML directly, we do NOT need to `Filter` suffix for the registered name (like it is described further down) 
        * We do NOT need to inject the filter into the controller in order to use it in the HTML page! AngularJS knows that the filter exists and then you are able to use it within the HTML page from the get go!
+ Reference: 
    - https://docs.angularjs.org/guide/filter
    - Built-In Filters: https://docs.angularjs.org/api/ng/filter
+ In order to use the filter within a controller section of the HTML and/or Javascript code, we need to inject the `$filter` service into the controller. 
+ We are able to create our own custom filters

## Self defined filters in AngularJS
+ A self defined filter needs a factory function!
    - This is a realization of the "factory design pattern" in softwareengineering
+ ***Factory Pattern***:
    - We have an object (in our case the `$filter` service of AngularJS) that receives some functions/objects that contain some construction rules how to create objects (in our case concrete filter functions) that follow these constuction rules. 
    - Calling the factory object with the name of the filter function that we defined on our AngularJS app in the javascript file results in the construction of a function object according to the registered factory function. 
+ Be careful: 
    - The `$filter` service of angular appends a `filternameFilter` (...Filter) suffix to the name of the filter that was defined on the angular app in the javascript file! --> Do _NOT_ name your filter with a Filter suffix, since you then need to call your filter function as `filernameFilterFilter`!
    - You can inject the filter function directly to your controller in your javascript file! Therefore, you add it to the `controllerName.$inject = ['$scope', 'filternameFilter']` and just can use it within the controller like a normal built-in javascript function. 
+ For a concrete syntax example, look at Week 2 Lecture 13
## Filters in HTML
+ Filters do NOT need to be injected to the controller where they are used if you are calling them from the HTML page!
    - `{{ value | filtername }}`
+ We are able to chain filters one after another by using multiple pipes
    - `{{ value | filtername1 | filtername2 }}`

## Digest Cycle
+ The digest cycle is the implementation of the user interaction handling from the browser
    - Its like the "game loop" in game development!
+ Visualization: 
[](images/digest_cycle_theory.png)
### Dirty Checking
+ The digest cycle implements a "dirty checking" loop
    - Dirty checking is a way of keeping track of changes about objects (whatever kind they might be) and only persist updates if they were made and only on the object that they were made on! All other elements stay the same 
        - If they are dependencies between two watched objects, the dependend object is updated in the next cylce after the first element was updated (even if the change could be happended if the depended element were already updated)
        - In the worst case, a change of an dependend object is realized after one loop iteration after the change of the depended object  
+ The dirty checking loop runs until every watcher returns "Notting changed since last check"
    - If notting changed anymore, the digest loop ends and then the HTML page gets updated
### Regard to angular
+ The `ng-*` attributes in the HTML page are the objects that the digest cycle of AngularJS watches for changes
    - If an event happens on the HTML page, the event is posted to the event queue of the browser!
+ Behind the scenes, the `$digest` service of angular is triggered by an `ng-*` event handler in the HTML page
+ ***Important note associated with AngularJS:***
    - All properties / attributes of javascript objects that has a `$$` in front of their names are AngularJS internals and therefore should not be used directly in your self written code!
    - However, it is useful to understand what some of them describe for debugging purposes
        - Example: `$$watchers` --> Pointer to the watcher function; `$$watchersCount` --> Number of watchers that are associated with an object
+ We can setup a watcher function if we want!
    - See Lecture 14 part 2 for more details!
+ Watcher functions can be set up manually. The `$$watchersCount` variable gets only incremented if we add a manual watch to the `$scope.$watch('watchname', watchFunctionPtr)`!
    - `var watchFunctionPtr = function(oldVal, NewVal){};`
    - `watchname` is the function name that is watched!
    - Internal AngularJS user interaction handling is not shown there!
    - But this is a very powerful way to implement functionallities like "This button is only clickable 2 times" or something like this! --> We can associate contains to watched events or variables!
## Setup watcher with AngularJS syntax
+ It is _NOT_ recommended to use `$scope.$watch()` in your javascript file, since it calls AngularJS internals directly!
    - Therefore, AngularJS provides functionallities to setup watchers! 
    - `ng-model` is also setup a watcher
        * Whenever something changes on the model, the watcher gets notifyed! (Thats the idea behind the MVVM pattern!)
        * By setting up an `ng-model` attibute to a HTML tag, we define it as a name within the scope of the corresponding controller where the `ng-model` is defined in!
    - See Lecture 14 part 3 for examples!
## `$digest` and `$apply` in AngularJS
+ The digest cycle for variables on the scope of an angular controller is _NOT_ invoked if the function that updates a scope variable is not aware of angular (i.e. is not an angular function or directly part of the angular setup (like a function that is associated with an `ng-*` event)!
    - In order to let the digest cycle know that it needs to run again and update the DOM fur us, we can use 
        * `$scope.$digest();` ***AFTER*** the update to the watched scope variable is applied
        * `$scope.$apply(function(){$scope.var = updateVal;})` and place the update ***INTO*** the apply function! 
    - Alternatively, there are a lot of AngularJS services that could be used and therefore, the digest cycle will be automatically triggered!
        - e.g. `$timeout`
## 2-way, 1-way binding and 1 time binding
+ What is 2-Way-Binding?
    - Setup a watcher on a variable/setup an event
    - Also setup a listener that looks for changes
+ What is 1-Way-Binding?
    - Bind a `$scope.varname` variable to the HTML page via interpolation! 
+ What is 1-Time-Binding? 
    - The watcher is only setup for the first update of the DOM and after it is updated, it will never be updated again!
    - Syntax: `{{ ::varName }}`
    - Rule of thumb: Max. 2000 watchers for a webpage
+ Overview: 
[](images/bindings_and_watchers_overview.png)