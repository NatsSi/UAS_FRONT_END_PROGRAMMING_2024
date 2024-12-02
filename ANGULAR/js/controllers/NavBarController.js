angular.module('NavBarController', [])
    .controller('NavBarController', ['$scope', '$location', function ($scope, $location) {
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
}]);