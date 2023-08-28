angular.module('RequestHeader', [])
    .controller('RequestHeaderController', function ($scope, userService, requestHeaderService, SidebarService) {
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


        // const formatDateToSubmit = (date) => {
        //     var newDate = new Date(date)
        //     return newDate.toLocaleDateString('en-GB').split('/').reverse().join('-');
        // };

        // $scope.createdFrom = null;
        // $scope.createTo = null;

        $scope.applyFilter = () => {
            var createdFrom = $scope.startDate === null ? "" : formatDateToSubmit($scope.startDate);
            var createdTo = $scope.endDate === null ? "" : formatDateToSubmit($scope.endDate);
            var filterData = {
                requestCode: $scope.requestCode,
                createdFrom: createdFrom,
                createdTo: createdTo,
                senderId: $scope.selectedCreatedBy ? $scope.selectedCreatedBy.Id : "",
                status: $scope.selectedStatus ? $scope.selectedStatus : ""
            };
            requestHeaderService.setFilterRequest(filterData);
        };

        $scope.clearFilter = () => {
            $scope.requestCode = "";
            $scope.startDate = null;
            $scope.endDate = null;
            $scope.dateRange = '';
            $scope.selectedCreatedBy = null;
            $scope.selectedStatus = null;
            var filterData = {
                requestCode: "",
                createdFrom: "",
                createdTo: "",
                senderId: "",
                status: ""
            }
            SidebarService.setTab("get-all");
            SidebarService.setStatus("");
            requestHeaderService.setFilterRequest(filterData);
        };

        $scope.$watch(() => {
            return requestHeaderService.getFilterRequest();
        }, (newFilter, oldFilter) => {
            if (newFilter !== oldFilter) {
                if (newFilter.requestCode === "" && newFilter.createdFrom === ""
                    && newFilter.createdTo === "" && newFilter.senderId === "") {
                    $scope.requestCode = "";
                    $scope.startDate = null;
                    $scope.endDate = null;
                    $scope.dateRange = '';
                    $scope.selectedCreatedBy = null;
                    $scope.selectedStatus = newFilter.status === "" ? null : newFilter.status;
                }
            }
        })

        // $scope.$watch('selectedCreatedBy', function (newValue, oldValue) {
        //     console.log(newValue);
        // })


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