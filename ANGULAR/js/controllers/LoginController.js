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

          if (response.data.email == 'admin123@gmail.com') {
            $window.location.href = 'Dashboard/dashboard.html#/list-event';
          } else {
            $window.location.href = 'Index_2.html#/home_2'; 
          }
        })
        .catch(function(error) {
            alert('Login Gagal! Email atau Password Salah');
        });
    };
}]);