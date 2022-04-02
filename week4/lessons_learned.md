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
        * `filename.type.js`
        * Here is 
            + `filename` the actual filename that defines the code within the file
            + `type` is the kind of angular module that is contained within the file. I.e. `module`, `component`, `service`
    - Make sure that the sequence of the inclusion of the files is done in a way that notting is used before it is interpreted by the javascript engine of the browser (ref.: "forward declaration")