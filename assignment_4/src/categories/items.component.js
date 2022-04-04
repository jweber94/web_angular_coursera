(function (){
    'use strict';

    angular.module('data')
        .component('items', {
            templateUrl: 'src/categories/templates/items_template.html',
            bindings: {
                m_items: '<' // one way binding
            }
        });
})(); 