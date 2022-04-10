( function () {
    'use strict';

    angular.module('data')
        .controller('CategoriesController', CategoriesController);

    CategoriesController.$inject = ['categorieItems'];
    function CategoriesController (categorieItems) {
        var CatCtrl = this;
        CatCtrl.catData = categorieItems;
    }

})(); 