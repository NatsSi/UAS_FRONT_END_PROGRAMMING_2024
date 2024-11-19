var yogo = angular.module('yogo', ['ngRoute', 'appControllers']);

yogo.config(function ($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider
    .when("/", {
        templateUrl: "/home",
        controller: "MainController"
    })
    .otherwise({
        redirectTo: "/"
    });
});