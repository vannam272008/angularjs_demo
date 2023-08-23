
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
            return $http.get(baseUrl + '/user/profile/' + id, getConfig());
        }

        const getUsers = () => {
            return $http.get(baseUrl + '/user/all?page=1&limit=100', getConfig());
        }

        this.getUserProfile = getUserProfile;
        this.getUsers = getUsers;

    }])
    .service('requestService', ['$http', function ($http) {
        const getRequests = (tab, requestCode, createdFrom, createdTo, senderId, status, currentPage, limit, searchQuery) => {
            const url = `/request/${tab}?requestCode=${requestCode}&createdFrom=${createdFrom}&createdTo=${createdTo}&senderId=${senderId}&status=${status}&page=${currentPage}&limit=${limit}&search=${searchQuery}`;
            return $http.get(baseUrl + url, getConfig());
        }

        this.getRequests = getRequests;
    }])