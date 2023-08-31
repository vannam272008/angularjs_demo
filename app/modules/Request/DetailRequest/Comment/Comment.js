angular.module('Comment', [])
    .controller('CommentController', function ($scope, $routeParams, requestService, userLoginService) {
        $scope.newComment = {
            comment: ""
        };

        const id = $routeParams.id;
        $scope.userLogin = userLoginService.getUser();

        $scope.commentList = [];

        $scope.formatDate = (date) => {
            return formatDateViewDetail(date);
        }

        $scope.submitComment = () => {
            requestService.createNewRequestComment(id, $scope.newComment)
                .finally(() => {
                    $scope.newComment.comment = "";
                    getAllRequestComments();
                })
                .catch((e) => {
                    console.log(e);
                })
        }

        $scope.handleEnter = ($event) => {
            if ($event.key === "Enter" && $event.keyCode === 13) {
                $scope.submitComment();
            }
        }

        const getAllRequestComments = () => {
            requestService.getAllRequestComments(id)
                .then((res) => {
                    $scope.commentList = res.data.Data;
                    console.log($scope.commentList);
                })
                .catch((e) => {
                    console.log(e);
                });
        }

        getAllRequestComments();

    })