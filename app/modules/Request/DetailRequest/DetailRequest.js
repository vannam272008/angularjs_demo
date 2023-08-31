angular.module('DetailRequest', ['ngRoute'])
    .controller('DetailRequestController', function ($scope, $window, $routeParams
        , $location, requestService, userService, $timeout) {
        $scope.loading = false;
        $scope.toasts = false;
        $scope.message = "";
        $scope.styleToast = {};

        const id = $routeParams.id;
        $scope.pathAPI = "http://localhost:63642/";
        $scope.detailRequest = {};
        $scope.approverList = [];
        $scope.attachmentList = [];

        const timeoutToast = () => {
            $timeout(() => {
                $scope.toasts = false;
            }, 3000);
        }

        $scope.formatDateViewDetail = (dateString) => {
            return formatDateViewDetail(dateString);
        }

        $scope.createPdfRequest = () => {
            requestService.createPdfRequest(id).then(() => {
                $window.open(`${$scope.pathAPI}Files/Pdf/${$scope.detailRequest.RequestCode}.pdf`);
            });
        };

        //--------------------- Call Api --------------------------//
        const getRequestById = () => {
            requestService.getRequestById(id)
                .then((res) => {
                    $scope.detailRequest = res.data.Data;
                })
                .catch((e) => {
                    console.log(e);
                });
        };

        const getRequestApprovers = () => {
            requestService.getRequestApprovers(id)
                .then((res) => {
                    $scope.approverList = res.data.Data;
                })
                .catch((e) => {
                    console.log(e);
                });
        };

        const getRequestAttachments = () => {
            requestService.getRequestAttachments(id)
                .then((res) => {
                    $scope.attachmentList = res.data.Data;
                })
                .catch((e) => {
                    console.log(e);
                });
        };

        // First Call
        getRequestById();
        getRequestApprovers();
        getRequestAttachments();

        // Call when loading change
        $scope.$watch('loading', function (newData, oldData) {
            if (newData !== oldData && newData === true) {
                getRequestById();
                getRequestApprovers();
                getRequestAttachments();
                $scope.loading = false;
            }
        })
        //--------------------- Call Api --------------------------//

        //--------------------- Menu Detail Request --------------------------//
        $scope.deleteRequest = () => {
            requestService.deleteRequest($scope.detailRequest.Id)
                .finally(() => {
                    $scope.message = "Delete Request Success!";
                    $scope.styleToast = {
                        color: 'green'
                    };
                    $scope.toasts = true;
                    $location.path("/request");
                })
                .catch((e) => {
                    console.log(e);
                })
        };

        // $scope.typeModal = "";
        $scope.actionRequestData = {
            action: "",
            Note: ""
        }

        $scope.selectTypeModal = (action) => {
            $scope.actionRequestData.action = action;
        }

        $scope.actionRequest = () => {
            if ($scope.actionRequestData.Note !== "") {
                requestService.actionRequest($scope.detailRequest.Id, $scope.actionRequestData)
                    .finally(() => {
                        $scope.message = $scope.actionRequestData.action + " Success";
                        $scope.styleToast = {
                            color: 'green'
                        };
                        $scope.toasts = true;
                        $scope.loading = true;
                        timeoutToast();
                    })
                    .catch((e) => {
                        $scope.message = $scope.actionRequestData.action + " Failed";
                        $scope.styleToast = {
                            color: 'red'
                        };
                        $scope.toasts = true;
                        timeoutToast();
                        console.log(e);
                    });
            }

        }

        $scope.actionCancelRequest = () => {
            $scope.actionRequestData.action = "Canceled";
            requestService.actionCancelRequest($scope.detailRequest.Id, $scope.actionRequestData)
                .finally(() => {
                    $scope.message = $scope.actionRequestData.action + " Success";
                    $scope.styleToast = {
                        color: 'green'
                    };
                    $scope.toasts = true;
                    $scope.loading = true;
                    timeoutToast();
                })
                .catch((e) => {
                    $scope.message = $scope.actionRequestData.action + " Failed";
                    $scope.styleToast = {
                        color: 'red'
                    };
                    $scope.toasts = true;
                    timeoutToast();
                    console.log(e);
                });
        };

        // Share
        $scope.userList = [];
        $scope.selectedShareUser = null;

        userService.getUsers()
            .then((res) => {
                $scope.userList = res.data.Data.ListData;
            });

        $scope.handleShare = () => {
            if ($scope.selectedShareUser !== null) {
                requestService.shareRequest($scope.detailRequest.Id, $scope.selectedShareUser.Id)
                    .finally(() => {
                        $scope.message = "Shared Success";
                        $scope.styleToast = {
                            color: 'green'
                        };
                        $scope.toasts = true;
                        $scope.loading = true;
                        timeoutToast();
                    })
                    .catch((e) => {
                        $scope.message = "Shared Failed";
                        $scope.styleToast = {
                            color: 'red'
                        };
                        $scope.toasts = true;
                        timeoutToast();
                        console.log(e);
                    })
            }

        }


        //--------------------- Menu Detail Request --------------------------//
    })
    .directive('customShareUserDropdown', function ($document) {
        return {
            restrict: 'A',
            scope: {
                ngModel: '=',
                options: '='
            },
            template: `
              <div class="custom-share-user-dropdown">
                <div class="selected-option" ng-click="toggleDropdown()">
                <div ng-if="ngModel === null" style="margin-top: 12px">
                    <span>--Select User--</span>
                </div>
                <div ng-if="!(ngModel === null)">
                    <div class="display-name">{{ ngModel.FirstName + ' ' + ngModel.LastName }}</div>
                    <div class="email-job">{{ ngModel.Email }}, {{ ngModel.JobTitle }}</div>
                </div>
                <span class="span-svg-select">
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/>
                    </svg>
                <span>
                </div>
                <div ng-class="isDropdownOpen ? 'dropdown-options show-dropdown' : 'dropdown-options'" ng-show="isDropdownOpen">
                  <div ng-class="ngModel === option ? 'active option' : 'option'" ng-repeat="option in options" ng-click="selectOption(option)">
                    <div class="display-name">{{ option.FirstName + ' ' + option.LastName }}</div>
                    <div class="email-job">{{ option.Email }}, {{ option.JobTitle }}</div>
                  </div>
                </div>
              </div>
            `,
            link: function (scope, element) {
                scope.isDropdownOpen = false;

                // Close the dropdown when a click occurs outside
                const onClick = function (event) {
                    if (!element[0].contains(event.target)) {
                        scope.$apply(function () {
                            scope.isDropdownOpen = false;
                        });
                    }
                };

                scope.toggleDropdown = function () {
                    scope.isDropdownOpen = !scope.isDropdownOpen;

                    if (scope.isDropdownOpen) {
                        $document.on('click', onClick);
                    } else {
                        $document.off('click', onClick);
                    }
                };

                scope.selectOption = function (option) {
                    scope.ngModel = option;
                    scope.isDropdownOpen = false;
                    $document.off('click', onClick);
                };

                // Clean up event listener when scope is destroyed
                scope.$on('$destroy', function () {
                    $document.off('click', onClick);
                });
            }
        };
    })