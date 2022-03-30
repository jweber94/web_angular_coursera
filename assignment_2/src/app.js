(function () {
    'use strict';
    // start IIFE
    angular.module("ShoppingListCheckOff", [])
        .controller("ToBuyController", ToBuyControllerFnc)
        .controller("AlreadyBoughtController", AlreadyBoughtControllerFcn)
        .service("ShoppingListCheckOffService", ShoppingListCheckOffServiceFcn);
        
    ToBuyControllerFnc.$inject = ['ShoppingListCheckOffService']; 
    function ToBuyControllerFnc(ShoppingListCheckOffService) {
        var toBuyCtrl = this; 

        toBuyCtrl.to_buy = ShoppingListCheckOffService.getBuyList();
        
        toBuyCtrl.buy = function (index){
            ShoppingListCheckOffService.isBought(index);
        };
    };

    AlreadyBoughtControllerFcn.$inject = ['ShoppingListCheckOffService']; 
    function AlreadyBoughtControllerFcn(ShoppingListCheckOffService) {
        var boughtCtrl = this; 
        
        boughtCtrl.bought = ShoppingListCheckOffService.getBoughtList();
    };
 
    function ShoppingListCheckOffServiceFcn() {
        var ShoppingListService = this; 
        
        ShoppingListService.to_buy = [
            { name: "cookies", quantity: 10 }, 
            { name: "eggs", quantity: 12 }, 
            { name: "chicken", quantity: 6 }, 
            { name: "fish", quantity: 2 }, 
            { name: "chocolat", quantity: 4 }]; 
        
        ShoppingListService.bought = []; 

        ShoppingListService.getBuyList = function () {
            return ShoppingListService.to_buy;
        }

        ShoppingListService.getBoughtList = function() {
            return ShoppingListService.bought; 
        }
        
        ShoppingListService.isBought = function (index) {
            ShoppingListService.bought.push(ShoppingListService.to_buy[index]);
            ShoppingListService.to_buy.splice(index, 1);
        };
    };
})(); 