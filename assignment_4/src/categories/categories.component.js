(function () {
    'use strict';

    angular.module('data') // Should be part of the data module since it needs access to the data that was retrieved by the menu data service that is only available within the data module
        .component('categories', {
            templateUrl: 'src/categories/templates/categories_template.html', // absolute path from the root of the web app
            bindings: {
                m_categories: '<' // TODO: Check this // one way binding
            }
        }); 

})();