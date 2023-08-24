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

        this.getUserProfile = getUserProfile;
        this.getUsers = getUsers;
        this.getUsersByDepartmentId = getUsersByDepartmentId;

    }])
    .service('requestService', ['$http', function ($http) {
        const getRequests = (tab, requestCode, createdFrom, createdTo, senderId, status, currentPage, limit, searchQuery) => {
            const endpoint = `/request/${tab}?requestCode=${requestCode}&createdFrom=${createdFrom}&createdTo=${createdTo}&senderId=${senderId}&status=${status}&page=${currentPage}&limit=${limit}&search=${searchQuery}`;
            return $http.get(baseUrl + endpoint, getConfig());
        };

        this.getRequests = getRequests;
    }])
    .service('departmentService', ['$http', function ($http) {
        const getDepartments = () => {
            const endpoint = "/department/all?page=1&limit=100";
            return $http.get(baseUrl + endpoint, getConfig());
        };

        this.getDepartments = getDepartments;
    }]);