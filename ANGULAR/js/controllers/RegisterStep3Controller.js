angular.module('RegisterStep3Controller', ['MembersService'])
    .constant("CSRF_TOKEN", '{{ csrf_token() }}')
    .controller('RegisterStep3Controller', ['$scope', '$location', '$http', '$window', '$route', 'MembersService', function ($scope, $location, $http, $window, $route, MembersService) {
        const queryParams = $location.search();
        $scope.email = queryParams.email || '';
        $scope.password = queryParams.password || '';
        $scope.subscription_type = queryParams.subscription_type || '';
        $scope.payment_method = '';

        console.log('Email:', $scope.email);
        console.log('Password:', $scope.password);
        console.log('Subscription Plan:', $scope.subscription_type);

        // Function to handle payment method selection
        $scope.selectPaymentMethod = function (method) {
            $scope.payment_method = method;
            console.log('Selected Payment Method:', $scope.payment_method);
        };

        // Function to submit data to the backend
        $scope.submitData = function () {
            if (!$scope.payment_method) {
                alert('Please select a payment method.');
                return;
            }
        
            const userData = {
                email: $scope.email.trim(),
                subscription_type: $scope.subscription_type.trim(),
                payment_method: $scope.payment_method.trim(),
                password: $scope.password.trim(),
                subscription_date: new Date().toISOString().split('T')[0] 
            };
        
            console.log('Sending user data:', userData);
        
            $http.post('http://localhost:8001/api/v1/members', userData)
                .then(response => {
                    console.log('Registration successful:', response);
                    alert('Registration successful!');
        
                    
                    $window.location.href = '#/';
                })
                .catch(error => {
                    console.error('Error during registration:', error);
                    if (error.data && error.data.errors) {
                        alert('Validation Errors: ' + JSON.stringify(error.data.errors));
                    } else {
                        alert('Unknown error occurred.');
                    }
                });
        };
        
        
}]);