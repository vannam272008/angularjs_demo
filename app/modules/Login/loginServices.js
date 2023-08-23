

angular.module('LoginServices', [])
    .service('carBookingAPIService', ['$http', function ($http) {
        // var loginData = {
        //     username: 'admin0001',
        //     password: '123456'
        // }


        const login = (loginData) => {
            return $http.post('http://localhost:63642/api/user/login', loginData, getConfig());
        }

        const logout = () => {
            return $http.get('http://localhost:63642/api/user/logout', getConfig());
        }

        this.login = login;
        this.logout = logout;

    }])
    .service('userLoginService', function () {
        var user = {
            isLogin: false,
            userInfo: {
                FullName: ""
            }
        };

        return {
            getUser: function () {
                return user;
            },
            setUser: function (newUser) {
                user = newUser;
            }
        };
    });