'use strict';

angular.module('CreateRequest', ['ngRoute'])
    .controller('CreateRequestController',
        ['$scope', '$sce', '$timeout', 'userLoginService', 'userService', 'departmentService', 'requestService', '$location',
            function ($scope, $sce, $timeout, userLoginService, userService, departmentService, requestService, $location) {
                $scope.loading = true;
                $scope.toasts = false;
                // ------------ Department + User --------------------- //


                $scope.departmentList = [];
                $scope.userList = [];
                $scope.selectedDepartment = null;
                $scope.selectedUser = null;

                // ------------ Approvers --------------------- //
                $scope.totalApprovers = 0;
                $scope.selectedApproverUserList = [];
                $scope.approverUserList = [];
                $scope.getRange = (start, end) => {
                    return getRange(start, end);
                }
                $scope.addApprover = () => {
                    $scope.totalApprovers += 1;
                    // $scope.selectedApproverUserList.push('');
                    // console.log($scope.selectedApproverUserList);
                }

                $scope.deleteApprover = (index) => {
                    $scope.totalApprovers -= 1;
                    $scope.approverUserList.push($scope.selectedApproverUserList[index]);
                    $scope.selectedApproverUserList.splice(index, 1);
                }



                // ------------ Approvers --------------------- //

                departmentService.getDepartments()
                    .then((res) => {
                        $scope.departmentList = res.data.Data.ListData;
                        $scope.selectedDepartment = $scope.departmentList[0];
                    })
                    .finally(() => {
                        $scope.userLogin = userLoginService.getUser();
                        $scope.loading = false;
                    })
                    .catch((e) => {
                        console.log(e);
                    });

                const getUsersByDepartmentId = (departmentId) => {
                    userService.getUsersByDepartmentId(departmentId)
                        .then((res) => {
                            $scope.userList = res.data.Data;
                            $scope.selectedUser = $scope.userList[0];
                        });
                }


                // $scope.approverUserListView = [];

                const getApproverUsers = (departmentId) => {
                    userService.getApproverUsers(departmentId)
                        .then((res) => {
                            $scope.approverUserList = res.data.Data;
                            $scope.approverUserListView = $scope.approverUserList;

                            // Select default approver
                            $scope.selectedApproverUserList = $scope.approverUserList.filter((approver) => approver.Position === "Manager");
                            var supervisorApprovers = $scope.approverUserList.filter((approver) => approver.Position === "Supervisor");
                            supervisorApprovers.map((supervisor) => {
                                $scope.selectedApproverUserList.push(supervisor);
                            });
                            $scope.totalApprovers = $scope.selectedApproverUserList.length;
                            // Select default approver

                        });
                };

                // $scope.changeSelectedApproverUser = (index) => {
                //     console.log("hi", index);
                // }



                $scope.$watch('selectedDepartment', function (newSelected, oldSelected) {
                    if (newSelected !== oldSelected) {
                        getUsersByDepartmentId($scope.selectedDepartment.Id);
                        getApproverUsers($scope.selectedDepartment.Id);
                    }
                });

                $scope.$watchCollection('selectedApproverUserList', (newSelected, oldSelected) => {
                    if (newSelected !== oldSelected) {
                        if ($scope.approverUserList.length > 0) {
                            $scope.approverUserList = $scope.approverUserListView.filter((user) => !newSelected.includes(user));
                        }

                    };
                })

                // ------------ Department + User --------------------- //

                // ------------ Input --------------------- //

                // function getCurrentFormattedDateTime() {
                //     const currentDate = new Date();
                //     const options = {
                //         year: 'numeric',
                //         month: '2-digit',
                //         day: '2-digit',
                //         hour: '2-digit',
                //         minute: '2-digit',
                //         hour12: true
                //     };
                //     return currentDate.toLocaleString('en-GB', options);
                // }

                $scope.mobile = "";
                $scope.costCenter = "";
                $scope.totalPassengers = "";
                $scope.usageTimeFrom = new Date();
                // $scope.usageTimeFrom = $scope.usageTimeFrom;
                $scope.usageTimeTo = new Date();
                // $scope.usageTimeTo = $scope.usageTimeTo.toISOString().substring(0, 16);
                $scope.pickTime = new Date();
                $scope.pickLocation = "";
                $scope.destination = "";
                $scope.reason = "";
                $scope.applyNote = "false";



                // ------------ Input --------------------- //

                // ------------ Files --------------------- //
                $scope.files = [];
                // $scope.selectedFile = null;

                // $scope.openFileInput = () => {
                //     document.getElementById('upload-file-attachment').click();
                // };

                $scope.uploadFiles = (files) => {
                    for (var i = 0; i < files.length; i++) {
                        $scope.files.push(files[i]);
                    }
                    $scope.$apply();
                }

                $scope.deleteFileUploaded = (index) => {
                    $scope.files.splice(index, 1);
                }

                // $scope.$watch('selectedFile', (newSelected, oldSelected) => {
                //     console.log(newSelected);
                // });

                // ------------ Files --------------------- //


                // ------------ Submit Request --------------------- //
                $scope.submitRequest = (type) => {
                    var requestData = {
                        SenderId: $scope.userLogin.userInfo.id,
                        DepartmentId: $scope.selectedDepartment.Id,
                        ReceiverId: $scope.selectedUser.User.Id,
                        Mobile: $scope.mobile,
                        CostCenter: $scope.costCenter,
                        TotalPassengers: $scope.totalPassengers,
                        PickLocation: $scope.pickLocation,
                        Destination: $scope.destination,
                        Reason: $scope.reason,
                        ApplyNote: $scope.applyNote,
                        UsageFrom: formatDateToSubmit($scope.usageTimeFrom),
                        UsageTo: formatDateToSubmit($scope.usageTimeTo),
                        PickTime: formatDateToSubmit($scope.pickTime),
                        ListOfUserId: $scope.selectedApproverUserList.map((user) => user.Id),
                        Status: "",
                        files: $scope.files
                    };

                    if (type === "Draft") {
                        requestData.Status = "Draft";
                    };

                    if (requestData.ReceiverId !== null && requestData.Mobile !== "" && requestData.CostCenter !== "" && requestData.totalPassengers !== ""
                        && requestData.pickLocation !== "" && requestData.Destination !== "" && requestData.Reason !== ""
                    ) {
                        requestService.postRequest(requestData)
                            .finally(() => {
                                $location.path('/request');
                            })
                            .catch((e) => {
                                console.log(e);
                            });
                    } else {
                        $scope.toasts = true;
                        $timeout(() => {
                            $scope.toasts = false;
                        }, 3000);
                    };
                };
                // ------------ Submit Request --------------------- //


                // $scope.saveDraft = () => {
                //     var requestData = {
                //         SenderId: $scope.userLogin.userInfo.id,
                //         DepartmentId: $scope.selectedDepartment.Id,
                //         ReceiverId: $scope.selectedUser.User.Id,
                //         Mobile: $scope.mobile,
                //         CostCenter: $scope.costCenter,
                //         TotalPassengers: $scope.totalPassengers,
                //         PickLocation: $scope.pickLocation,
                //         Destination: $scope.destination,
                //         Reason: $scope.reason,
                //         ApplyNote: $scope.applyNote,
                //         UsageFrom: formatDateToSubmit($scope.usageTimeFrom),
                //         UsageTo: formatDateToSubmit($scope.usageTimeTo),
                //         PickTime: formatDateToSubmit($scope.pickTime),
                //         ListOfUserId: $scope.selectedApproverUserList.map((user) => user.Id),
                //         Status: "Draft",
                //         files: $scope.files
                //     };
                //     if (requestData.ReceiverId !== null && requestData.Mobile !== "" && requestData.CostCenter !== "" && requestData.totalPassengers !== ""
                //         && requestData.pickLocation !== "" && requestData.Destination !== "" && requestData.Reason !== ""
                //     ) {
                //         requestService.postRequest(requestData)
                //             .then((res) => {
                //                 console.log(res);
                //             })
                //             .finally(() => {
                //                 $location.path('/request');
                //             })
                //             .catch((e) => {
                //                 console.log(e);
                //             });
                //     } else {
                //         $scope.toasts = true;
                //         $timeout(() => {
                //             $scope.toasts = false;
                //         }, 3000);
                //     };
                // };





            }])
    .directive('customUserDropdown', function ($document) {
        return {
            restrict: 'A',
            scope: {
                ngModel: '=',
                options: '='
            },
            template: `
              <div class="custom-user-dropdown">
                <div class="selected-option" ng-click="toggleDropdown()">
                <div ng-if="ngModel === undefind" style="margin-top: 15px">
                    <span>--Select approver--</span>
                </div>
                <div ng-if="!(ngModel === undefind)">
                    <div class="display-name">{{ ngModel.User.FullName === undefind ? ngModel.FullName : ngModel.User.FullName }}</div>
                    <div class="email-job">{{ ngModel.User.Email === undefind ? ngModel.Email : ngModel.User.Email }}, {{ ngModel.User.JobTitle === undefind ? ngModel.JobTitle : ngModel.User.JobTitle }}</div>
                </div>
                <span class="span-svg-select">
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/>
                    </svg>
                <span>
                </div>
                <div ng-class="isDropdownOpen ? 'dropdown-options show-dropdown' : 'dropdown-options'" ng-show="isDropdownOpen">
                  <div ng-class="ngModel === option ? 'active option' : 'option'" ng-repeat="option in options" ng-click="selectOption(option)">
                    <div class="display-name">{{ option.User.FullName === undefind ? option.FullName : option.User.FullName }}</div>
                    <div class="email-job">{{ option.User.Email === undefind ? option.Email : option.User.Email }}, {{ option.User.JobTitle === undefind ? option.JobTitle : option.User.JobTitle }}</div>
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
    });
    // .directive('dateTimeFormat', function () {
    //     return {
    //         require: 'ngModel',
    //         link: function (scope, element, attrs, ngModelCtrl) {
    //             ngModelCtrl.$formatters.push(function (value) {
    //                 if (!value) return value;

    //                 // Convert input value to Date object
    //                 const dateTime = new Date(value);

    //                 // Format date
    //                 const formattedDate = `${dateTime.getDate().toString().padStart(2, '0')}/${(dateTime.getMonth() + 1).toString().padStart(2, '0')
    //                     }/${dateTime.getFullYear()}`;

    //                 // Format time with AM/PM
    //                 let hours = dateTime.getHours();
    //                 const minutes = dateTime.getMinutes();
    //                 const amPm = hours >= 12 ? 'PM' : 'AM';
    //                 hours = hours % 12 || 12;
    //                 const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${amPm}`;

    //                 // Combine formatted date and time
    //                 const formattedDateTime = `${formattedDate} ${formattedTime}`;

    //                 return formattedDateTime;
    //             });
    //         }
    //     };
    // });