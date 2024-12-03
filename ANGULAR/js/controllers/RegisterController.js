angular.module('RegisterController', ['MembersService'])
    .constant("CSRF_TOKEN", '{{ csrf_token() }}')
    .controller('RegisterController', ['$scope', '$location', '$http', '$window', '$route', 'MembersService', function ($scope, $location) {
        $scope.email = $location.search().email;

        // Redirect Step 1
        $scope.redirectToRegister = function(email) {
            if (email) {
                $location.path('/register-step-1').search('email', email);
            } else {
                document.getElementById('warning').innerText = 'Please enter a valid email address.';
            }
        };  
}]);