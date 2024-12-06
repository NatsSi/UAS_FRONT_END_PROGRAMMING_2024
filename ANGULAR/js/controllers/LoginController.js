angular.module('LoginController', [])
    .controller('LoginController', ['$scope', '$http', '$window', function ($scope, $http, $window) {
        $scope.login = function() {
            const credentials = {
                email: $scope.email,
                password: $scope.password
            };

            $http.post('http://127.0.0.1:8001/api/v1/login', credentials, { withCredentials: true })
            .then(function(response) {
                alert('Login berhasil!');

                const userData = {
                    id: response.data.id,
                    email: response.data.email
                };
                localStorage.setItem('currentUser', JSON.stringify(userData));

                if (response.data.email === 'admin123@gmail.com') {
                    $window.location.href = 'Dashboard/dashboard.html#/list-event';
                } else {
                    console.log('Redirecting to URL:', `Index_2.html#/home_2/${response.data.id}`);
                    $window.location.href = `Index_2.html#/home_2`;
                }
            })
            .catch(function(error) {
                console.error('Login Error:', error); // Debug error
                alert('Login Gagal! Email atau Password Salah');
            });

        };
    }]);
