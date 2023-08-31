// /* global bootstrap: false */
// (() => {
//     'use strict'
//     const tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
//     tooltipTriggerList.forEach(tooltipTriggerEl => {
//         new bootstrap.Tooltip(tooltipTriggerEl)
//     }
// })()
angular.module('Sidebar', [])
    .controller('SidebarController', function ($scope, SidebarService) {
        $scope.sidebarClick = () => {
            $('#sidebar').toggleClass('active');
        }

        $scope.clicked = "get-all";

        $scope.$watchGroup([
            () => {
                return SidebarService.getTab();
            },
            () => {
                return SidebarService.getStatus();
            }
        ], (newValues, oldValues) => {
            if (newValues[0] === "get-all" && newValues[1] === "") {
                $scope.clicked = "get-all";
            }
        });

        $scope.clickRequestTab = (tab) => {
            SidebarService.setTab(tab);
            $scope.clicked = tab;
            SidebarService.setStatus("");
        };

        $scope.clickStatusTab = (status) => {
            SidebarService.setStatus(status);
            $scope.clicked = status;
            SidebarService.setTab("get-all");
        };

        $scope.inputSearch = "";

        $scope.handleSearch = () => {
            SidebarService.setSearch($scope.inputSearch);
        }

        $scope.handleEnter = ($event) => {
            if ($event.key === "Enter" && $event.keyCode === 13) {
                $scope.handleSearch();
            }
        }
    })
    .service('SidebarService', function () {
        var tab = "";
        var status = "";
        var search = "";
        return {
            getTab: function () {
                return tab;
            },
            setTab: function (newTab) {
                tab = newTab;
            },
            getStatus: function () {
                return status;
            },
            setStatus: function (newStatus) {
                status = newStatus;
            },
            getSearch: function () {
                return search;
            },
            setSearch: function (newSearch) {
                search = newSearch;
            },

        }
    })