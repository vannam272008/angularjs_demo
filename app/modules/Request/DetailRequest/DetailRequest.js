angular.module('DetailRequest', ['ngRoute'])
    .controller('DetailRequestController', function ($scope, $window, $routeParams, requestService) {
        $scope.loading = false;
        $scope.toasts = false;
        const id = $routeParams.id;
        $scope.pathAPI = "http://localhost:63642/";
        $scope.detailRequest = {};
        $scope.approverList = [];
        $scope.attachmentList = [];

        $scope.formatDateViewDetail = (dateString) => {
            return formatDateViewDetail(dateString);
        }

        $scope.createPdfRequest = () => {
            requestService.createPdfRequest(id).then(() => {
                $window.open(`${$scope.pathAPI}Files/Pdf/${$scope.detailRequest.RequestCode}.pdf`);
            });
        }

        requestService.getRequestById(id)
            .then((res) => {
                $scope.detailRequest = res.data.Data;
            })
            .catch((e) => {
                console.log(e);
            });

        requestService.getRequestApprovers(id)
            .then((res) => {
                $scope.approverList = res.data.Data;
            })
            .catch((e) => {
                console.log(e);
            });

        requestService.getRequestAttachments(id)
            .then((res) => {
                $scope.attachmentList = res.data.Data;
            })
            .catch((e) => {
                console.log(e);
            })

    })