angular.module('DriverServices', [])
    .factory('ergastAPIservice', function ($http) {

        var ergastAPI = {};

        ergastAPI.getDrivers = function () {
            var url = 'http://ergast.com/api/f1/2013/driverStandings.json';
            return $http({
                method: 'JSONP',
                url: url
            });
        }

        ergastAPI.getDriverDetails = function (id) {
            var url = 'http://ergast.com/api/f1/2013/drivers/' + id + '/driverStandings.json';
            return $http({
                method: 'JSONP',
                url: url
            });
        }

        ergastAPI.getDriverRaces = function (id) {
            var url = 'http://ergast.com/api/f1/2013/drivers/' + id + '/results.json';
            return $http({
                method: 'JSONP',
                url: url
            });
        }

        return ergastAPI;
    });
