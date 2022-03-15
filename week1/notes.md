# Week 1 notes

## Why AngularJS?
+ Angular (as well as other frameworks) make the codebase more easy to read, understand and use in contrast to writing everything from scratch in javascript
+ Main takeaways
  - Find the relevant code quickly
  - Update functionality without a re-write of large portions of the code
  - code reuse and therefore avoid copy paste bugs
  - Easy testable code
==> Dealing with complexity

## What makes code complex?
+ Hard to read code
  - Fixable by a good linther, style guides or coding rules and a good documentation
+ Lack of high cohesion and low coupling
  - High cohesion:
    * "High cohesion is when smaller pieces of functionality are strongly related to each other within some code boundary"
    * Boundary could be a module, class, ... --> Depends on the perspective how you look at the code
    * If your code is high cohesive, then _it is programmed in a way that one thing stick to doing just one thing_
      - This could be done by using multiple sub functions that are called by the top level function, whereas the sub functions are closely related to each other but they are all do it a little different. Therefore the top level (and therefore calling) function is also doing just what the function should do and not deal with the sub functionallities.
    * Low cohesion is very complex and hard to understand code (and therefore ***not good!***), since a boundary contains much subfunctions that are not related to each other. Therefore the top level class/boundary/scope/function could not mentally grouped in one functional block
      - Sometimes sub functions/components are complicting with each other. This should be avoided if possible
  - Loose coupling:
    * Loose coupling is to design software such that a component/boundary has the least possible dependency of one component on another component
    * Since a loosely coupled part of the software has a minimal interface, it could easily exchanged by another component
      - Aim: ***If you change one component, you should not need to change the other!***
+ Examples in web development:
  - Lack of loose coupling:
    * Associating your javascript code directly with HTML-Tag ID or class attributes --> If you change the ID or class name, your javascript application will break the project
  - Lack of high cohesion:
    * One function does read the content from the HTML page/user interaction as well as processing it and re-inserting it --> This should be placed into three functions that are called by a top-level function (maybe you would like to use a namespace to do this)
==> AngularJS helps us to archive loose coupling and high cohesion in our code!

## Design Patterns and Model-View-View Model (MVVM):
+ Design- and Architecture Patterns:
  * Cook-recipies for a solution to reccuring types of problems (Most problems how to implement things fast and well understandable - especially with regard to high cohesion and loose coupling - recurre over and over again and we do not need to thing every time when we have such a problem from scratch!)
  * If we run into a completly new type of problem or we want to find a new design pattern ==> SWE research
  * It takes experience to deduce the appropriate pattern to an unknown problem (i.e. you need to understand which kind of problem we want to solve and then you can deduce the design pattern!)
### MVVM:
+ Is commonly used for user interaction with the code (i.e. on a website)
+ Components:
  * Model
    - Represents and hold the raw data
    - Some data of the raw data is display but not necessary all data that the model contains
    - Can also contain logic to retrieve the data from the source (i.e. an AJAX call to the server)
    - ***Does NOT contain:*** the logic how to display the data/model ~ Just contains the data
    - Commonly done in javascript in web development
    - *_Data/Business logic_*
  * View:
    - Is the user interface
    - In a web application it is the HTML and CSS code that defines the view
    - The view ***never*** changes the data of the model
    - Broadcasts events but ***never handles the events on its own!***
    - Commonly triggers the controller (aka ViewModel) to take the broadcasted information
    - *_UI/Presentation_*
  * View-Model/Controller:
    - Is the representation of the state of the view - backside of the model
    - Holds the data that is displayed in the view
    - Responds to view-events (= presentation logic)
    - Calls the business-logic and triggers processing
    - ***Never ever ask the view to display anything***
      * Never asks or interact with the DOM
    - *_Presentation Logic_* --> What should be done with things that were broadcasted by the view and based on that changes the data
  * Declarative Binder:
    - Declaratively binds the View-Model to the View
    - Key-enabler for the whole MVVM pattern
+ Overview:
[](images/mvvm_pattern_web.png)

+ MVVM is the basis of AngularJS, therefore it is sometimes called MV-Whatever or MV*
  - But you can break out the MVVM design pattern with angular

# Install AngularJS:
+ Download AngularJS 1.x
  - https://angularjs.org/
    - Take the latest angular 1 version, for example angular 1.5.7 and then choose the `angular.js` (or in order to save bandwidth in your web application `angular.min.js`) file to download
    - https://code.angularjs.org/1.5.7/
      * Find this on `develop->download` on the page
+ You need to insert the `angular.js` or `angular.min.js` file into the `src` folder of your website project and include it as a script ***before*** you use ***ANY*** angular functionallities in your own script
  - Because your browser interprets the website sequenitally
## Basic usage of angular:
+ Variables that start with a `$` are angular variables (you could define your own variables that start with `$` but it is not recommend to do that in order to make clear what variables come from the angular framework)
+ It is best practice to use an IIFEn for your script
+ You can use the `angular.` object that is defined by the angular script to create new controllers, modules, ...
  - Syntax: `angular.module('ModName', [dependency, list, of, the, module])`
    * Link this to a html tag - ideally a very outer tag, in order to make the angular module to be responsible for managing everything from the start of the tag until the closing tag (and everything that is included in between). This is done by the `ng-app` attribute for the html tags
+ The module function of angular returns a module instance!
+ angular module instances have the attribute / sub object `.controller('ControllerName', function(){// view-model/Controller functionality })`
  - This controller module needs to be bound to the html tag that is should control. Therefore, use the `ng-controller="ControllerName"` attribute for the html tag that you want to control with it.
  - MVC-Pattern relation: HTML is the view, controller is the controller. The declarative binder is in the case of angular, angular itself.
## How to exchange data between the HTML page and the javascript code that is using angular?
+ The `$scope` variable:
  - The `$scope` property/variable of angular are able to expose sub variables to the view (aka HTML page)
  - In order to place the variables that are defined on the `$scope` variable into the view/html page, you can just use the double curly braces to insert the variable to the html page.
    * Example:
    ```
    <div ng-controller="MyFirstContoller">
      Hi {{name}}, where name is the variable, defined on the $scope variable of angular
    </div>
    ```
  - Every `ng-*` marked HTML tag has their own `$scope` variable
  - We also can call functions and print their return values by using the `{{fncName}}` syntax in the html
+ In order to hand over input from the user to the javascript code, we need to define the `ng-model=` attribute to (e.g.) `<input>` tags
    - Since the user input is look at if it were a model that the view (aka javascript code) should read in
    - Example: `<input type="text" ng-model="name">`
    - Name on the `$scope` varible is then written by the html page
    - Because using `ng-model` invokes the javascript code in the background, we can directly use the defined input on the `$scope` variable after it was written
      * Example:
      ```
      <div ng-controller="MyFirstController">
        <input type="text" ng-model="name">
        Inside the input is: {{name}}
      </div>
      ```
      * If the scope variables is defined on your javascript file as well as an model, the model will overwrite whatever you do on your javascript code
+ `ng-keyup` attribute in html: 
  - is used to tell the controller that it should run the associated function whenever the key lifts up
  - It requires a function after the assignment operator that should be invoked whenever the key is lifted up
    - CAUTION: The function needs to be visible on the `$scope` variable
## `ng-` attribues
+ The `ng-` attributes are non-standard HTML attributes. 
+ Standard attributes are interpreted by the html parser and realize the common use from W3. 
  - If the HTML-parser sees a non-standard attribute, it does not throw an error and writes it to the attribute list of the individual HTML tag within the HTML document.  
  - We can get the attribute by selecting the HTML element and then ask for its attributes or for a specific attribute (like `ng-model`, ...)
    - Example:
    ```
    var elem = document.getElementById("target");
    console.log(elem.getAttribute("ng-app")); // delivers the rhs of the attribute from the html tag that has the ID "target" 
    ```
    - We can also select the element by the occurence of a specific attribute: 
    ```
    var elem = document.querySelector("[ng-app]"); 
    console.log(elem.getAttribute("ng-app")); 
    ```
    - This way we can get a handle for the html tag that holds the defined tags

# Dependency Injection (DI)
+ Is another design pattern!
  - In angular it is used in order to make the global context available via the `$scope` variable!
  - Everything with a $ in front of its name is in angular called "a service"!
  - All rhs of `ng-*` from the HTML document are properties that need to be defined from your javascript code and are published to the global scope via the `$scope.*` variable!
    - Reminder: The keyword after the `ng-` defines a functionallity (e.g. `ng-blur` for invokeing the linked function on the `$scope` variable from javascript if the HTML tag loses focus)
+ Dependency Injection = "Design pattern that implements inversion of control for resolving dependencies"
  - DI is the design pattern that implements the "inversion of control" logic (IoC)
+ We get the `$scope` object by DI
+ Opposite of the "Composition" pattern, where a class / object has a member of a subclass / another object that implements some function that is called from within surounding class
  - That would result in tight coupling
+ Inversion of control works by handing over the object / class that should be used from within the calling class. 
  - Therefore we do not need to change the code within the class / object, since the concrete instance from which the methods are used inside the surounding class are already instanciated!
  - Add-on: C++ ~ We can define an abstact base class that defines what methods a valid parameter-object need to have and by doing this, we ensure that all methods that are used by the surounding class are there (by marking them pure virtual)
  - Visualization: 
  [](images/ioc_pattern.png)
  - IoC is sometimes called "Don't call us, we call you" - Pattern
  - The client gets called with the dependency by some system - in our case, the "system" is AngularJS

## `$filter` service 
+ Is an angular service that is used for formating the data that is incoming from the HTML page (aka model)
  - All default filter functionallities: https://www.w3schools.com/angular/angular_filters.asp


### How does dependency injection work in Javascript?
+ If we `console.log(fcn_name)`, we receive the function text back. We could actually convert the printed (function-) object to a string by using its (always for a function object delivered) `.toString()` method
  - `console.log(fnc_name.toString())`
+ After we received the code as a string back, we could parse the text of it like a normal string
  - If we now searching for regular expressions that begin with a `$`-sign and uses one of the angular defined services (e.g. filter or scope), we could save this information inject the corresponding service object in case of the function invocation!  
  - ***Debugging Tipp***: If you want to see a function definition while debugging, you just can call `console.log(fcn_name.toString())` and look at the particular function object instead of looking throu the whole code base!
+ The parsing-and-insertion service that is used (and implemented) by angular is called `$injector`!
  - If you want to see which services are injected to a function, just add the `$injector` service as an argument to the function and then do the following: 
  ```
  console.log($injector.annotate(fnc_name))
  ```
## Minification and AngularJS
+ Minification = Transpile javascript code with a program that removes all unnecessary characters that are used to improve readability but is not needed for the function implementation. Also all spaces, tabs and linebreaks are removed
  - Therefore the resulting javascript file is fully functional but has a much smaller size (which is good in order to optimize for low bandwidths)
  - In production we should ALWAYS minify our javascript code in order to improve the user experience with short loading times of your webpage!
  - There are many minification programs on the web - just google for it (sometimes called "uglyfier")
+ We will run into problems with angular services, since `$`-signs as function parameters get deleted by the minification programs!
  - Two methods to avoid this: 
    * 1.: Define the parameters to a linked function in angular with an array: 
    ```
    angular.module("MyMod", ['$scope', '$filter', fnc_name]);

    function fnc_name ($scope, $filter) {
      // fnc definition
    }
    ```
    * 2.: Define the function parameter injection with the $inject method on the function that is linked 
    ```
    angular.module("MyMod", fnc_name);
    fnc_name.$inject = ['$scope', '$filter'];
    ```

# Expressions and Interpolation in AngularJS
+ Expressions = Something that evaluates to some value
  - Expressions have access to the variables of the scope of the context that they are defined in (e.g. everything between the opening and closing tag of the `ng-module` marked HTML tags)
  - Expressions also have access to the $scope service
  - Defined by `{{ expression }}` in the HTML code!
  - Expressions do NOT throw errors, they just evalute to garbage if they are not valid
  - flow-control (like `if`-statements) are not allowed within the expression
+ Expressions are used to interpolate the place where they are used in
  - Interpolation = Process of evaluating a string literal containing one or more placeholders, which are replaced with values
+ You can place fixed variable names (that you can rewrite within your javascript code if you want) into the expression marks
+ You can also place function calls into the expression marks and the result of the function is inserted at the point where the expression marks are placed
+ Expressions are shown in the sources list of the web browsers developer tools but the replaced (and actually displayed) version is shown in the "inspect"/"elements" section of the browsers developer tools
+ ***CAUTION***: If a expression is used within the HTML code _BEFORE_ the angularJS is exaluated (e.g. as a part of the source path to a link or an image), the HTML parser of your browser will show an error, even if the page is correctly displayed.
  - The reason is that the HTML parser is invoked before the page is completed by AngularJS. 
  - We can avoid this by not using regular HTML link-definitions but the AngularJS ones: 
    - `<img ng-src="/path/to/img_{{test}}.png">` 