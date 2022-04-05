( function () {
    'use strict';

    angular.module('data')
        .controller('CategoriesController', CategoriesController);

    CategoriesController.$inject = ['categorieItems'];
    function CategoriesController (categorieItems) {
        var CatCtrl = this; 
        CatCtrl.categorieItems = categorieItems; // safe the resolved categories from the router state within the controller scope 
    }

})(); 