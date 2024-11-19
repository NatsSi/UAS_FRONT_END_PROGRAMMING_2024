var appControllers = angular.module('appControllers', []);

appControllers.controller('RecipesController', ['$scope', '$http', function ($scope, $http) {

}]);

appControllers.controller('EventsController', ['$scope', '$http', function ($scope, $http) {

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