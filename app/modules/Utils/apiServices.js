const baseUrl = 'http://localhost:63642/api';

angular.module('apiServices', [])
    .service('userService', ['$http', function ($http) {
        // const token = localStorage.getItem('token');
        // const config = {
        //     headers: {
        //         Accept: 'application/json',
        //         Authorization: `Bearer ${token}`,
        //     },
        // };


        const getUserProfile = () => {
            const id = localStorage.getItem('Id');
            const endpoint = "/user/profile/"
            return $http.get(baseUrl + endpoint + id, getConfig());
        };

        const getUsers = () => {
            const endpoint = "/user/all?page=1&limit=100";
            return $http.get(baseUrl + endpoint, getConfig());
        };

        const getUsersByDepartmentId = (departmentId) => {
            const endpoint = "/departmentMember/position?departmentId=" + departmentId;
            return $http.get(baseUrl + endpoint, getConfig());
        }

        const getApproverUsers = (departmentId) => {
            const endpoint = "/userRole/all-approvers/" + departmentId;
            return $http.get(baseUrl + endpoint, getConfig());
        }

        this.getUserProfile = getUserProfile;
        this.getUsers = getUsers;
        this.getUsersByDepartmentId = getUsersByDepartmentId;
        this.getApproverUsers = getApproverUsers;

    }])
    .service('requestService', ['$http', function ($http) {
        const getRequests = (tab, requestCode, createdFrom, createdTo, senderId, status, currentPage, limit, searchQuery) => {
            const endpoint = `/request/${tab}?requestCode=${requestCode}&createdFrom=${createdFrom}&createdTo=${createdTo}&senderId=${senderId}&status=${status}&page=${currentPage}&limit=${limit}&search=${searchQuery}`;
            return $http.get(baseUrl + endpoint, getConfig());
        };

        const postRequest = (data) => {
            var formData = new FormData();
            // for (var key in data) {
            //     formData.append(key, data[key]);
            // }
            for (var key in data) {
                console.log("post: ", key, "data key: ", data[key]);
                if (Array.isArray(data[key])) {
                    for (var i = 0; i < data[key].length; i++) {
                        formData.append(key, data[key][i]);
                    }
                } else {
                    formData.append(key, data[key]);
                }
            }

            const endpoint = "/request/create";
            return $http.post(baseUrl + endpoint, formData, getConfigForm());
        };

        const getRequestById = (id) => {
            const endpoint = `/request/Id=${id}`;
            return $http.get(baseUrl + endpoint, getConfig());
        };

        const deleteRequest = (id) => {
            const endpoint = `/request/${id}`;
            return $http.delete(baseUrl + endpoint, getConfig());
        };

        const actionRequest = (id, data) => {
            var formData = new FormData();
            for (var key in data) {
                formData.append(key, data[key]);
            };

            const endpoint = `/request/action/Id=${id}`;
            return $http.put(baseUrl + endpoint, formData, getConfigForm());
        }

        const actionCancelRequest = (id, data) => {
            var formData = new FormData();
            for (var key in data) {
                formData.append(key, data[key]);
            };

            const endpoint = `/request/action/cancel/Id=${id}`;

            return $http.put(baseUrl + endpoint, formData, getConfigForm());
        }

        const getRequestApprovers = (id) => {
            const endpoint = `/request/workflow/requestId=${id}`;
            return $http.get(baseUrl + endpoint, getConfig());
        };

        const getRequestAttachments = (id) => {
            const endpoint = `/request/attachment/requestId=${id}`;
            return $http.get(baseUrl + endpoint, getConfig());
        };

        const createPdfRequest = (id) => {
            const endpoint = `/file/pdf-request/${id}`;
            return $http.get(baseUrl + endpoint, getConfig());
        };

        const getAllRequestComments = (id) => {
            const endpoint = `/request/comment/requestId=${id}`;
            return $http.get(baseUrl + endpoint, getConfig());
        }

        const createNewRequestComment = (id, data) => {
            const endpoint = `/request/comment/requestId=${id}`;
            var formData = new FormData();
            for (var key in data) {
                formData.append(key, data[key]);
            };

            return $http.post(baseUrl + endpoint, formData, getConfigForm());
        }

        const shareRequest = (id, userId) => {
            const endpoint = "/request/share/create";
            var requestShare = {
                RequestId: id,
                UserId: userId
            }
            return $http.post(baseUrl + endpoint, requestShare, getConfig());
        }


        this.getRequests = getRequests;
        this.postRequest = postRequest;
        this.getRequestById = getRequestById;
        this.getRequestApprovers = getRequestApprovers;
        this.getRequestAttachments = getRequestAttachments;
        this.createPdfRequest = createPdfRequest;
        this.deleteRequest = deleteRequest;
        this.actionRequest = actionRequest;
        this.actionCancelRequest = actionCancelRequest;
        this.getAllRequestComments = getAllRequestComments;
        this.createNewRequestComment = createNewRequestComment;
        this.shareRequest = shareRequest;
    }])
    .service('departmentService', ['$http', function ($http) {
        const getDepartments = () => {
            const endpoint = "/department/all?page=1&limit=100";
            return $http.get(baseUrl + endpoint, getConfig());
        };

        this.getDepartments = getDepartments;
    }]);