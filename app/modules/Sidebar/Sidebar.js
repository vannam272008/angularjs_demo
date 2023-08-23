// /* global bootstrap: false */
// (() => {
//     'use strict'
//     const tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
//     tooltipTriggerList.forEach(tooltipTriggerEl => {
//         new bootstrap.Tooltip(tooltipTriggerEl)
//     })
// })()
angular.module('Sidebar', [])
    .controller('SidebarController', function ($scope) {
        $scope.sidebarClick = (event) => {
            $('#sidebar').toggleClass('active');
        }
    })