angular.module('RegisterStep1Controller', ['MembersService'])
  .constant("CSRF_TOKEN", '{{ csrf_token() }}')
  .controller('RegisterStep1Controller', ['$scope', '$location', '$window', function ($scope, $location, $window) {
    
    // Retrieve the email from the query parameters
    $scope.email = $location.search().email;

    // Create an object to store form data
    $scope.formData = {
      email: $scope.email,  // pre-fill email field
      password: ''
    };

    // Function to handle form submission
    $scope.submitForm = function() {
      if ($scope.formData.password) {
        // Add the password to the query string
        var nextStepUrl = '#/register-step-2?email=' + encodeURIComponent($scope.formData.email) + '&password=' + encodeURIComponent($scope.formData.password);

        // Redirect to the next step with the email and password in the query parameters
        $window.location.href = nextStepUrl;
      } else {
        $scope.errorMessage = "Password is required!";
      }
    };
  }]);
