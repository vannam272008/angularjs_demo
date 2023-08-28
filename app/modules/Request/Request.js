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
    .controller('RequestController', ['$scope', '$location', 'requestService', 'requestHeaderService', 'SidebarService',
        function ($scope, $location, requestService, requestHeaderService, SidebarService) {
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
                requestService.getRequests($scope.tab, $scope.filter.requestCode, $scope.filter.createdFrom, $scope.filter.createdTo, $scope.filter.senderId, $scope.filter.status, $scope.pagination.currentPage, $scope.pagination.perPage, "")
                    .then((res) => {
                        $scope.requestList = res.data.Data.ListData;
                        $scope.pagination = {
                            currentPage: res.data.Data.CurrentPage,
                            perPage: res.data.Data.PerPage,
                            totalPage: res.data.Data.TotalPage === 0 ? 1 : res.data.Data.TotalPage
                        }
                    })
                    .finally(() => {
                        $scope.loading = false;
                        $scope.test = "456";
                    })
                    .catch((e) => {
                        console.log(e);
                    });
            };

            console.log("hello");
            fetchRequestList();

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

                    // fetchRequestList();
                }
            });

            $scope.$watch(() => {
                return SidebarService.getTab();
            }, (newTab, oldTab) => {
                console.log("hi");
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
                    // Set default Filter
                    console.log("filter: ", $scope.filter);


                    fetchRequestList();
                }
            });

            $scope.$watch(() => {
                return SidebarService.getStatus();
            }, (newStatus, oldStatus) => {
                if (newStatus !== oldStatus) {
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

                    console.log("filter-status: ", $scope.tab);

                    fetchRequestList();
                }
            });

        }]);