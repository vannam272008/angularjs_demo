'use strict';

angular.module('Request', ['ngRoute'])
    .controller('RequestController', ['$scope', 'requestService', 'requestHeaderService', function ($scope, requestService, requestHeaderService) {
        $scope.tab = "get-all";
        $scope.search = "";
        $scope.firstFetch = true;
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
            totalPage: null
        };
        $scope.loading = true;
        $scope.getRange = function (start, end) {
            var range = [];
            for (var i = start; i <= end; i++) {
                range.push(i);
            }
            return range;
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
                console.log("pagination");
                fetchRequestList();
            }
        });

        const fetchRequestList = () => {
            $scope.loading = true;
            requestService.getRequests("get-all", $scope.filter.requestCode, $scope.filter.createdFrom, $scope.filter.createdTo, $scope.filter.senderId, $scope.filter.status, $scope.pagination.currentPage, $scope.pagination.perPage, "")
                .then((res) => {
                    console.log(res.data.Data);
                    $scope.requestList = res.data.Data.ListData;
                    $scope.pagination = {
                        currentPage: res.data.Data.CurrentPage,
                        perPage: res.data.Data.PerPage,
                        totalPage: res.data.Data.TotalPage
                    }
                })
                .finally(() => {
                    $scope.loading = false;
                    $scope.firstFetch = false;
                    $scope.test = "456";
                })
                .catch((e) => {
                    console.log(e);
                });
        };

        // console.log("hello");
        if ($scope.firstFetch === true) {
            fetchRequestList();
            console.log("hello: ", $scope.test);
        }



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

    }]);