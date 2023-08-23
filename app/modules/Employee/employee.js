'use strict';


angular.module('Employee', ['ngRoute'])

  // .config(['$routeProvider', function($routeProvider) {
  //   $routeProvider.when('/employee', {
  //     templateUrl: 'Employee/index.html',
  //     controller: 'EmployeeController'
  //   });
  // }])

  .controller('EmployeeController', function ($scope) {
    var initEmployeeList = [
      {
        FirstName: 'Nam 1',
        LastName: 'Ho',
        Email: 'namho23@gmail.com'
      },
      {
        FirstName: 'Nam 2',
        LastName: 'Ho',
        Email: 'namho23@gmail.com'
      },
      {
        FirstName: 'Nam 3',
        LastName: 'Ho',
        Email: 'namho23@gmail.com'
      },
      {
        FirstName: 'Nam 4',
        LastName: 'Ho',
        Email: 'namho23@gmail.com'
      },
      {
        FirstName: 'Nam 5',
        LastName: 'Ho',
        Email: 'namho23@gmail.com'
      },
    ]
    $scope.employeeList = initEmployeeList;
    $scope.firstName = null;
    $scope.lastName = null;
    $scope.email = null;
    $scope.editIndex = null;
    $scope.editData = {
      FirstName: null,
      LastName: null,
      Email: null
    }
    $scope.editFirstName = null;
    $scope.editLastName = null;
    $scope.editEmail = null;

    $scope.createNewEmployee = () => {
      var newEmployee = {
        FirstName: $scope.firstName,
        LastName: $scope.lastName,
        Email: $scope.email
      }

      if (newEmployee.FirstName !== null && newEmployee.LastName !== null && newEmployee.Email !== null && newEmployee.Email !== undefined) {
        $scope.employeeList.push(newEmployee);
        $scope.firstName = null;
        $scope.lastName = null;
        $scope.email = null;
      }
    }

    $scope.editEmployee = (index) => {
      $scope.editIndex = index;
      angular.forEach($scope.employeeList, (employee, key) => {
        if (key == index) {
          $scope.editData.FirstName = employee.FirstName;
          $scope.editData.LastName = employee.LastName;
          $scope.editData.Email = employee.Email;
        }
      })
    };

    $scope.saveEmployee = (index) => {
      if ($scope.editData.FirstName !== undefined && $scope.editData.LastName !== undefined && $scope.editData.Email !== undefined) {
        $scope.employeeList[index].FirstName = $scope.editData.FirstName;
        $scope.employeeList[index].LastName = $scope.editData.LastName;
        $scope.employeeList[index].Email = $scope.editData.Email;
        $scope.editIndex = null;
        $scope.editData = {
          FirstName: null,
          LastName: null,
          Email: null
        }
      }
    };

    $scope.cancelEdit = () => {
      $scope.editIndex = null;
    };

    $scope.deleteEmployee = (index) => {
      $scope.employeeList.splice(index, 1);
    };

    $scope.changeData = () => {
      console.log($scope.editFirstName);
    }

  });