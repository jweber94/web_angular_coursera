(function () {
    'use strict';
    angular.module('MenuApp', ['ui.router', 'data']); // menu app depends on the data module. Therefore it needs to be declared before the MenuApp module is loaded in the HTML page
})(); 