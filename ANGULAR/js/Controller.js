var appControllers = angular.module('appControllers', []).constant("CSRF_TOKEN", '{{ csrf_token() }}');

appControllers.controller('RecipesController', ['$scope', '$http', function ($scope, $http) {

}]);

appControllers.controller('EventsController', ['$scope', '$http', '$window', function ($scope, $http, $window, CSRF_TOKEN) {
    $scope.formData = {};
    $scope.eventId = localStorage.getItem('eventId');

    $http.get('http://127.0.0.1:8001/api/v1/events').then(function(response){
        $scope.datas = response.data.data;
    });

    $http.get('http://127.0.0.1:8001/api/v1/events/' + localStorage.getItem('eventId')).then(function(response){
        $scope.data = response.data.events;
    });

    $scope.getEventId = function(eventId) {
        localStorage.setItem('eventId', eventId);
    };

    $scope.createEvent = function() {
        $http({
            method: 'POST',
            url: 'http://127.0.0.1:8001/api/v1/create-event', // Ganti dengan URL API Laravel Anda
            data: $scope.formData,
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': CSRF_TOKEN,
            },
        }).then(function successCallback(response) {
            alert('Form submitted successfully!');  
            $window.location.href = "list-event.html";
        }, function errorCallback(response) {
            let errorMessages = '';
            angular.forEach(response.data.errors, function (messages, field) {
                // `messages` is an array of error messages for a particular field
                angular.forEach(messages, function (message) {
                    errorMessages += message + '\n';
                });
            });
            alert(errorMessages);
        });
    };

    $scope.updateEvent = function(eventId) {
            $http({
                method: 'PUT',
                url: 'http://127.0.0.1:8001/api/v1/events/' + eventId, // Ganti dengan URL API Laravel Anda
                data: $scope.formData,
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': CSRF_TOKEN,
                },
            }).then(function successCallback(response) {
                alert('Form update successfully!');  
                $window.location.href = "list-event.html";
            }, function errorCallback(response) {
                let errorMessages = '';
                angular.forEach(response.data.errors, function (messages, field) {
                    // `messages` is an array of error messages for a particular field
                    angular.forEach(messages, function (message) {
                        errorMessages += message + '\n';
                    });
                });
                alert(errorMessages);
            });
    };

    $scope.deleteEvent = function(eventId) {
        if (confirm("Are you sure you want to delete this event?")) {
            $http.delete('http://127.0.0.1:8001/api/v1/events/' + eventId)
                .then(function(response) {
                    alert('Event deleted successfully');
                    $window.location.href = "list-event.html";
                })
                .catch(function(response) {
                    let errorMessages = '';
                    angular.forEach(response.data.errors, function (messages, field) {
                        // `messages` is an array of error messages for a particular field
                        angular.forEach(messages, function (message) {
                            errorMessages += message + '\n';
                        });
                    });
                    alert(errorMessages);
                });
        }
    };
}]);

appControllers.controller('BlogController', ['$scope', '$http', function ($scope, $http) {
    $scope.pesan = 'coba'
}]);

appControllers.controller('MemberController', ['$scope', '$http', function ($scope, $http) {
    $scope.pesan = "Coba";
}]);

appControllers.controller('VideosController', ['$scope', '$http', function ($scope, $http) {
    $scope.pesan = "Coba";
}]);