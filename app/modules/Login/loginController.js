'use strict';

angular.module('Login', ['ngRoute', 'LoginServices'])
    .controller('LoginController', ['$scope', '$location', '$timeout', 'carBookingAPIService', 'userLoginService', function ($scope, $location, $timeout, carBookingAPIService, userLoginService) {
        $scope.loginData = {
            username: null,
            password: null,
        }
        $scope.toasts = false;
        $scope.message = null;

        $scope.login = () => {
            carBookingAPIService.login($scope.loginData)
                .then((res) => {
                    if (res.data.Success) {
                        userLoginService.setUser({
                            isLogin: true,
                            userInfo: {
                                FullName: res.data.Data.userInfo.FullName,
                                id: res.data.Data.userInfo.Id,
                                avatarPath: res.data.Data.userInfo.AvatarPath
                            }
                        });
                        $location.path('/request');
                        localStorage.setItem('Id', res.data.Data.userInfo.Id);
                        localStorage.setItem('token', res.data.Data.jwtToken);
                    } else {
                        $scope.toasts = true;
                        $scope.message = res.data.Message;
                    }
                })

        }

        $scope.logout = () => {
            carBookingAPIService.logout()
                .then((res) => {
                    if (res.data.Success) {
                        $timeout(() => {
                            userLoginService.setUser({
                                isLogin: false,
                                userInfo: {
                                    FullName: "",
                                    id: "",
                                    avatarPath: ""
                                }
                            });
                        });
                        localStorage.clear();
                        $location.path('/login');
                    } else {
                        console.log(res.data.Message);
                    }
                })
        }

    }]);