var yogo = angular.module('yogo', ['ngRoute', 'appControllers', 'ngSanitize']);

yogo.config(function ($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider
    .when("/ANGULAR/html/events.html", {
        templateUrl: "events.html",
        controller: "EventsController"
    })
    .when("/ANGULAR/html/events.html", {
        templateUrl: "events.html",
        controller: "EventsController"
    })
    .when("/ANGULAR/html/Dashboard/list-event.html", {
        templateUrl: "list-event.html",
        controller: "EventsController"
    })
    .when("/ANGULAR/html/Dashboard/create-event.html", {
        templateUrl: "create-event.html",
        controller: "EventsController"
    })
    .when("/ANGULAR/html/Dashboard/update-event.html", {
        templateUrl: "update-event.html",
        controller: "EventsController"
    })
    .otherwise({
        redirectTo: "/"
    });
});