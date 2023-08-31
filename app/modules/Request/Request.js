'use strict';

angular.module('Request', ['ngRoute'])
    // .config(['$routeProvider', function ($routeProvider) {
    //     $routeProvider
    //         .when('/request/create', {
    //             templateUrl: 'modules/Request/CreateRequest/index.html',
    //             controller: 'CreateRequestController',
    //             resolve: {
    //                 auth: checkAuthentication
    //             }
    //         })
    // }])
    .controller('RequestController', ['$scope', '$location', 'requestService', 'requestHeaderService', 'SidebarService', 'requestControllerService',
        function ($scope, $location, requestService, requestHeaderService, SidebarService, requestControllerService) {
            $scope.classStatus = (status) => {
                if (status === "Waiting for approval") {
                    return "status-approving";
                }
                else if (status === "Draft") {
                    return "status-draft";
                }
                else if (status === "Rejected") {
                    return "status-rejected";
                }
                else if (status === "Approved") {
                    return "status-approved";
                }
                else if (status === "Canceled") {
                    return "status-canceled";
                }
                else {
                    return "status-done";
                }
            };
            $scope.doubleClickDetail = (requestId) => {
                const path = `/request/view/${requestId}`;
                $location.path(path);
            }
            $scope.tab = "get-all";
            $scope.search = "";
            $scope.test = "123";
            $scope.filter = {
                requestCode: "",
                createdFrom: "",
                createdTo: "",
                senderId: "",
                status: ""
            };

            $scope.requestList = [];
            $scope.pagination = {
                currentPage: 1,
                perPage: 20,
                totalPage: 1
            };
            $scope.loading = true;
            $scope.getRange = function (start, end) {
                return getRange(start, end);
            };

            $scope.handleClickPage = (index) => {
                $scope.pagination.currentPage = index;
            }

            $scope.handleClickNextPage = () => {
                if ($scope.pagination.currentPage < $scope.pagination.totalPage) {
                    $scope.pagination.currentPage += 1;
                }
            }

            $scope.handleClickPreviousPage = () => {
                if ($scope.pagination.currentPage > 1) {
                    $scope.pagination.currentPage -= 1;
                }
            }

            $scope.$watch('pagination.currentPage', function (newPage, oldPage) {
                if (newPage !== oldPage) {
                    fetchRequestList();
                }
            });

            const fetchRequestList = () => {
                $scope.loading = true;
                requestService.getRequests($scope.tab, $scope.filter.requestCode, $scope.filter.createdFrom, $scope.filter.createdTo,
                    $scope.filter.senderId, $scope.filter.status, $scope.pagination.currentPage, $scope.pagination.perPage, $scope.search)
                    .then((res) => {
                        $scope.requestList = res.data.Data.ListData;
                        $scope.pagination = {
                            currentPage: res.data.Data.CurrentPage,
                            perPage: res.data.Data.PerPage,
                            totalPage: res.data.Data.TotalPage === 0 ? 1 : res.data.Data.TotalPage
                        }
                    })
                    .finally(() => {
                        requestControllerService.setRequestData($scope.requestList);
                        $scope.loading = false;
                        $scope.test = "456";
                    })
                    .catch((e) => {
                        console.log(e);
                    });
            };

            //------ First Call Api -------//
            fetchRequestList();
            //------ First Call Api -------//

            $scope.$watch(() => {
                return requestHeaderService.getFilterRequest();
            }, (newFilter, oldFilter) => {
                if (newFilter !== oldFilter) {
                    $scope.filter = {
                        requestCode: newFilter.requestCode,
                        createdFrom: newFilter.createdFrom,
                        createdTo: newFilter.createdTo,
                        senderId: newFilter.senderId,
                        status: newFilter.status
                    };
                    $scope.pagination.currentPage = 1;
                    fetchRequestList();
                }
            });

            $scope.$watch(() => {
                return SidebarService.getTab();
            }, (newTab, oldTab) => {
                if (newTab !== oldTab) {
                    $scope.tab = newTab;
                    // Set default Filter
                    $scope.filter = {
                        requestCode: "",
                        createdFrom: "",
                        createdTo: "",
                        senderId: "",
                        status: ""
                    };
                    $scope.pagination.currentPage = 1;
                    requestHeaderService.setFilterRequest($scope.filter);


                    fetchRequestList();
                }
            });

            $scope.$watch(() => {
                return SidebarService.getStatus();
            }, (newStatus, oldStatus) => {
                if (newStatus !== oldStatus) {
                    // Set default Filter
                    $scope.filter = {
                        requestCode: "",
                        createdFrom: "",
                        createdTo: "",
                        senderId: "",
                        status: newStatus
                    };
                    $scope.tab = "get-all";
                    $scope.pagination.currentPage = 1;
                    requestHeaderService.setFilterRequest($scope.filter);

                    fetchRequestList();
                }
            });

            $scope.$watch(() => {
                return SidebarService.getSearch();
            }, (newSearch, oldSearch) => {
                if (newSearch !== oldSearch) {
                    $scope.search = newSearch;
                    $scope.pagination.currentPage = 1;
                    fetchRequestList();
                }
            });

            // // Export Excel
            // $scope.exportExcelData = function () {
            //     var blob = new Blob([document.getElementById('exportable').innerHTML], {
            //         type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
            //     });
            //     saveAs(blob, "Report.xls");
            // };

        }])
    .service('requestControllerService', function () {
        var requestData = [];
        return {
            setRequestData: function (newData) {
                requestData = newData;
            },
            getRequestData: function () {
                return requestData;
            }
        };
    })