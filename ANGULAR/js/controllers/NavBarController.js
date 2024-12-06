angular.module('NavBarController', [])
    .controller('NavBarController', ['$scope', '$location', '$window', '$http', function ($scope, $location, $window, $http) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));

        // Tampilkan email jika data tersedia
        if (currentUser) {
            $scope.memberEmail = currentUser.email;
        } else {
            $scope.memberEmail = 'Guest';
        }


        $scope.navbarJS = function() {
            const hamburger = document.querySelector("#hamburger");
            const navMenu = document.querySelector("#nav ul");
        
            if (hamburger && navMenu) {
                hamburger.addEventListener("click", function() {
                    hamburger.classList.toggle("active");
                    navMenu.classList.toggle("active");
                });
            } else {
                console.error("Hamburger or nav elements not found in the DOM.");
            }
        }

        $scope.isActive = function(route) {
            active =  route == $location.path();
            return active;
        };

        $scope.navbarJS();

        $scope.logoutMember = function () {
            $http.post('http://127.0.0.1:8001/api/v1/logout',)
            .then(function(response) {
                alert('Anda telah logout.');
                $window.location.href = 'Index.html#/'; 
            })
            .catch(function(error) {
                alert('Logout Gagal!');
            });
        };

        $scope.logoutAdmin = function () {
            $http.post('http://127.0.0.1:8001/api/v1/logout',)
            .then(function(response) {
                alert('Anda telah logout.');
                $window.location.href = '../Index.html#/'; 
            })
            .catch(function(error) {
                alert('Logout Gagal!');
            });
        };
}]);