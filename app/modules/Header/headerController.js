'use strict';

angular.module('Header', ['ngRoute', 'apiServices'])
    .controller('HeaderController', ['$scope', 'userLoginService', '$location', 'userService', function ($scope, userLoginService, $location, userService) {
        $scope.currentPath = $location.path().substring(1);

        // --------Show info user after login-------------//
        $scope.userLogin = userLoginService.getUser();

        $scope.$watch(() => {
            return userLoginService.getUser();
        }, (newValue, oldValue) => {
            if (newValue !== oldValue) {
                $scope.userLogin = newValue;
            }
        });
        // ----------------------------------------//


        // --------- Call api to set user info after reload ----------------//
        $scope.token = localStorage.getItem('token');

        if ($scope.token !== null && $scope.userLogin.isLogin === false) {
            userService.getUserProfile()
                .then((res) => {
                    if (res.data.Success) {
                        userLoginService.setUser({
                            isLogin: true,
                            userInfo: {
                                FullName: res.data.Data.FirstName + ' ' + res.data.Data.LastName,
                                id: res.data.Data.Id,
                                avatarPath: res.data.Data.AvatarPath
                            }
                        });
                    } else {
                        $location.path('/login');
                    }
                })
                .catch((e) => {
                    if (e.status === 401) {
                        $location.path('/login');
                    }
                })
        }
        // -----------------------------------------------------------------//


    }]);