'use strict';

angular.module('CreateRequest', ['ngRoute'])
    .controller('CreateRequestController', ['$scope', 'userLoginService', 'userService', 'departmentService', function ($scope, userLoginService, userService, departmentService) {
        $scope.userLogin = userLoginService.getUser();
        $scope.departmentList = [];
        $scope.userList = [];
        $scope.selectedDepartment = null;
        departmentService.getDepartments()
            .then((res) => {
                $scope.departmentList = res.data.Data.ListData;
                $scope.selectedDepartment = $scope.departmentList[0];
                console.log($scope.selectedDepartment);
                userService.getUsersByDepartmentId($scope.selectedDepartment.Id)
                    .then((res) => {
                        console.log(res.data);
                        $scope.userList = res.data.Data;
                        console.log($scope.userList);
                    })
            })
            .catch((e) => {
                console.log(e);
            });


        // $scope.$watch(('selectedDepartment'), (newSelected, oldSelected) => {
        //     console.log(newSelected);
        // })
    }]);