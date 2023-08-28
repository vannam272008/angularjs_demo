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
                if (Array.isArray(data[key])) {
                    for (var i = 0; i < data[key].length; i++) {
                        formData.append(key + '[]', data[key][i]);
                    }
                } else {
                    formData.append(key, data[key]);
                }
            }

            const endpoint = "/request/create";
            return $http.post(baseUrl + endpoint, formData, getConfigForm());
        }

        const getRequestById = (id) => {
            const endpoint = `/request/Id=${id}`;
            return $http.get(baseUrl + endpoint, getConfig());
        }

        const getRequestApprovers = (id) => {
            const endpoint = `/request/workflow/requestId=${id}`;
            return $http.get(baseUrl + endpoint, getConfig());
        }

        const getRequestAttachments = (id) => {
            const endpoint = `/request/attachment/requestId=${id}`;
            return $http.get(baseUrl + endpoint, getConfig());
        }

        const createPdfRequest = (id) => {
            const endpoint = `/file/pdf-request/${id}`;
            return $http.get(baseUrl + endpoint, getConfig());
        }

        this.getRequests = getRequests;
        this.postRequest = postRequest;
        this.getRequestById = getRequestById;
        this.getRequestApprovers = getRequestApprovers;
        this.getRequestAttachments = getRequestAttachments;
        this.createPdfRequest = createPdfRequest;
    }])
    .service('departmentService', ['$http', function ($http) {
        const getDepartments = () => {
            const endpoint = "/department/all?page=1&limit=100";
            return $http.get(baseUrl + endpoint, getConfig());
        };

        this.getDepartments = getDepartments;
    }]);