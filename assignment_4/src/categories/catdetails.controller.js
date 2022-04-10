( function() {
    'use strict';

    angular.module('data', [])
        .controller('CategorieDetailController', CategorieDetailController);

    CategorieDetailController.$inject = ['categorieItems']; // $stateParams contains all information about the UI router defined state
    function CategorieDetailController (categorieItems) {
        var csCtrl = this;

        csCtrl.itemsData = categorieItems;
        csCtrl.itemNamesList = []; 
        for (var i = 0; i < csCtrl.itemsData.menu_items.length; i++) {
            csCtrl.itemNamesList[i] = csCtrl.itemsData.menu_items[i].name;
        }
    };
})(); 