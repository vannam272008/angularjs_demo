'use strict';

angular.module('Driver', ['ngRoute'])
    /* Drivers controller */
    .controller('DriversController', function ($scope, ergastAPIservice) {
        $scope.loading = true;
        $scope.nameFilter = null;
        $scope.driversList = [];
        $scope.searchFilter = function (driver) {
            var re = new RegExp($scope.nameFilter, 'i');
            return !$scope.nameFilter || re.test(driver.Driver.givenName) || re.test(driver.Driver.familyName);
        };

        ergastAPIservice.getDrivers().then(function (response) {
            //Digging into the response to get the relevant data
            $scope.driversList = response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
        })
            .finally(function () {
                $scope.loading = false;
            })
            .catch(function (error) {
                console.error('Error fetching drivers:', error);
            });

    })


    /* Driver controller */
    .controller('DriverController', function ($scope, $routeParams, ergastAPIservice) {
        $scope.loading = true;
        $scope.id = $routeParams.id;
        $scope.races = [];
        $scope.driver = null;

        ergastAPIservice.getDriverDetails($scope.id).then(function (response) {

            $scope.driver = response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0];
        })
            .finally(function () {
                $scope.loading = false;
            })
            .catch(function (error) {
                console.error('Error fetching drivers:', error);
            });

        ergastAPIservice.getDriverRaces($scope.id).then(function (response) {
            $scope.races = response.data.MRData.RaceTable.Races;
        })
            .finally(function () {
                $scope.loading = false;
            })
            .catch(function (error) {
                console.error('Error fetching drivers:', error);
            });
    });