# Lessons Learned from the Homework Assignment 4
+ Top tipp: ***Use the coding example from lecture 40 as a reference implementation!***
+ If we are working with states as a single page web application, we need to make sure, that if a user copies the link in our browser window and insert it into another tab or sends the link to some other computer, the exact same website will appear there!
    * This could be a problem if we are working with artifacts! 
    * Solution: TODO
+ ***1 artifact per file rule:*** 
    * Defines that if a javascript file declares a controller, it should ***NOT*** declare anything else like a service or component and vice versa.
    * All artifacts use a separate file in our javascript application
+ Implementation tipp: 
    * Do _NOT_ create all states at once and make them run after they are created. 
    * Implement only one state and make it work properly and then go to the next one. 
        - By doing this, the routes need to get defined one after another!
+ Components = Easier way for defining a directive
+ Code separation into more then one javascript file: 
    - _Lecture 35 part 2 video_ from week 4 
    - File naming convention: 
        * `componentname.type.js`
        * Here is 
            + `componentname` the name of the component/module that defines the code within the file
            + `type` is the kind of angular module that is contained within the file. I.e. `module`, `component`, `service`
    - Make sure that the sequence of the inclusion of the files is done in a way that notting is used before it is interpreted by the javascript engine of the browser (ref.: "forward declaration")

## Implementation details
+ ***Angular Modul definition:***
    - All parts of the angular implementation needs to be within an IIFE!
    - The angular module needs to be defined on *ALL* files!
+ One-Way-Binding: 
    - Bind a value from the component to the view (aka DOM, like in our example in the assignment) _OR_ from the view to the component.
    - The binding works onedirectional. You can not see changes from the perspective of the bound part of the binding. Only changes from the bound part are visible within the aimed part!
+ The `$stateProvider` service of angular UI-router is used to define reproduceable states of a route (or as states of the web application)
    - Reference: https://www.edureka.co/blog/stateprovider-in-angularjs/#:~:text=%24stateProvider%20is%20used%20to%20define,concept%20of%20%24stateprovider%20in%20AngularJS.

## Important to note from the assignment explaination:
+ We do *NOT* need to show an individual item view! 
    - It is only necessary to show the list of items within the choosen category!!!

# Next Step to finish the homework: 
1.: Make the categories state run properly by listing the categories from the server within the state ~ Finishing categories state(Tue)
2.: Make the listings clickable and get the data for the items from the server ~ finishing items state (Wed)
3.: Make sure that we can copy the link (Thu)