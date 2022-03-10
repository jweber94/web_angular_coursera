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
