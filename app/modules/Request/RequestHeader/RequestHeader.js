angular.module('RequestHeader', [])
    .controller('RequestHeaderController', function ($scope, userService, requestHeaderService) {
        $scope.toasts = false;
        $scope.message = null;

        // ------------ Request Code --------------------- //

        $scope.requestCode = "";

        // ------------ Request Code --------------------- //


        // ------------ Created --------------------- //
        $scope.startDate = null;
        $scope.endDate = null;
        $scope.dateRange = '';

        $scope.$watchGroup(['startDate', 'endDate'], function (newValues, oldValues) {
            if ($scope.startDate !== null && $scope.endDate !== null) {
                var newStartDate = new Date(newValues[0]);
                var newEndDate = new Date(newValues[1]);

                if (newStartDate > newEndDate) {
                    $scope.dateRange = "";
                    $scope.toasts = true;
                    $scope.message = 'Start Date > End Date';
                } else {
                    $scope.toasts = false;
                    $scope.dateRange = formatDateView(newStartDate) + ' - ' + formatDateView(newEndDate);
                }
            }

        });

        // $scope.applyDateRange = function () {
        //     $scope.toasts = false;
        //     var startDate = new Date($scope.startDate);
        //     var endDate = new Date($scope.endDate);

        //     if (startDate > endDate) {
        //         $scope.dateRange = "";
        //         $scope.toasts = true;
        //         $scope.message = 'Start Date > End Date';
        //         return;
        //     }
        //     $scope.dateRange = formatDateView(startDate) + ' - ' + formatDateView(endDate);
        //     console.log($scope.startDate);
        // };

        const formatDateView = (date) => {
            return date.toLocaleDateString('en-GB');
        }
        // ------------ Created --------------------- //


        // ------------ Created by --------------------- //

        $scope.selectedCreatedBy = null;
        $scope.userList = [];
        userService.getUsers()
            .then((res) => {
                if (res.data.Success) {
                    $scope.userList = res.data.Data.ListData;
                } else {
                    console.log(res.data.Message);
                }
            });

        // $scope.$watch('selectedCreatedBy', function (newSelected, oldSelected) {
        //     if (oldSelected !== newSelected) {
        //         console.log($scope.selectedCreatedBy);
        //     }
        // })

        // ------------ Created by --------------------- //


        // ------------ Status --------------------- //

        $scope.selectedStatus = null;
        $scope.statusList = ['Draft', 'Waiting for approval', 'Approved', 'Rejected', 'Canceled', 'Done'];

        // $scope.$watch('selectedStatus', function (newSelected, oldSelected) {
        //     if (oldSelected !== newSelected) {
        //         console.log($scope.selectedStatus);
        //     }
        // })
        // ------------ Status --------------------- //


        const formatDateToSubmit = (date) => {
            console.log("date: ", date);
            var newDate = new Date(date)
            return newDate.toLocaleDateString('en-GB').split('/').reverse().join('-');
        }

        $scope.createdFrom = null;
        $scope.createTo = null;

        $scope.applyFilter = () => {
            $scope.createdFrom = $scope.startDate === null ? "" : formatDateToSubmit($scope.startDate);
            $scope.createdTo = $scope.endDate === null ? "" : formatDateToSubmit($scope.endDate);
            var filterData = {
                requestCode: $scope.requestCode,
                createdFrom: $scope.createdFrom,
                createdTo: $scope.createdTo,
                senderId: $scope.selectedCreatedBy ? $scope.selectedCreatedBy.Id : "",
                status: $scope.selectedStatus ? $scope.selectedStatus : ""
            };
            requestHeaderService.setFilterRequest(filterData);
            // console.log("filter: ", $scope.requestCode);
            // console.log("filter: ", $scope.createdFrom);
            // console.log("filter: ", $scope.createdTo);
            // console.log("filter: ", $scope.selectedCreatedBy ? $scope.selectedCreatedBy.Id : null);
            // console.log("filter: ", $scope.selectedStatus);
        }

        $scope.clearFilter = () => {
            var filterData = {
                requestCode: "",
                createdFrom: "",
                createdTo: "",
                senderId: "",
                status: ""
            }
            requestHeaderService.setFilterRequest(filterData);
        }


    })
    .service('requestHeaderService', function () {
        var filterRequest = {
            requestCode: "",
            createdFrom: "",
            createdTo: "",
            senderId: "",
            status: ""
        }
        return {
            getFilterRequest: function () {
                return filterRequest;
            },
            setFilterRequest: function (filterData) {
                filterRequest = filterData;
            }

        }
    });