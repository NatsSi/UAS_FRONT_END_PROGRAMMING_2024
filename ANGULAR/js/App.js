var yogo = angular.module('yogo', [
    'ngRoute', 
    'ngSanitize',
    'NavBarController', 
    'HomeController', 
    'EventsController',
    'RegisterController',
    'RegisterStep1Controller',
    'RegisterStep2Controller',
    'RegisterStep3Controller',
    'EventsService',
    'MembersService'
    ]);

yogo.directive('head', ['$rootScope','$compile',
    function($rootScope, $compile){
        return {
            restrict: 'E',
            link: function(scope, elem){
                var html = '<link rel="stylesheet" ng-repeat="(routeCtrl, cssUrl) in routeStyles" ng-href="{{cssUrl}}" />';
                elem.append($compile(html)(scope));
                scope.routeStyles = {};
                $rootScope.$on('$routeChangeStart', function (e, next, current) {
                    if(current && current.$$route && current.$$route.css){
                        if(!angular.isArray(current.$$route.css)){
                            current.$$route.css = [current.$$route.css];
                        }
                        angular.forEach(current.$$route.css, function(sheet){
                            delete scope.routeStyles[sheet];
                        });
                    }
                    if(next && next.$$route && next.$$route.css){
                        if(!angular.isArray(next.$$route.css)){
                            next.$$route.css = [next.$$route.css];
                        }
                        angular.forEach(next.$$route.css, function(sheet){
                            scope.routeStyles[sheet] = sheet;
                        });
                    }
                });
            }
        };
    }
]);


yogo.config(function ($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider
    .when('/', {
        templateUrl: 'Home.html', // Home page
        controller: 'HomeController',
        css: '../css/Home.css'
    })
    .when('/events', {
        templateUrl: 'Events.html', // Events page
        controller: 'EventsController',
        css: '../css/Events.css'
    })
    .when('/events/detail', {
        templateUrl: 'Events_Detail.html', // Event Detail page
        controller: 'EventsController',
        css: '../css/Events_Detail.css'
    })
    .when('/list-event', {
        templateUrl: 'list-event.html', // List Event page
        controller: 'EventsController',
    })
    .when('/create-event', {
        templateUrl: 'create-event.html', // Create Event page
        controller: 'EventsController',
    })
    .when('/update-event', {
        templateUrl: 'update-event.html', // Update Event page
        controller: 'EventsController',
    })
    .when('/register', {
        templateUrl: 'Register.html', // REGISTER
        controller: 'RegisterController',
        css: '../css/Register.css',
        layout: 'no-footer'
    })
    .when('/register-step-1', {
        templateUrl: 'Register_Step_1.html', // REGISTER
        controller: 'RegisterStep1Controller',
        css: '../css/Register_Step_1.css'
    })
    .when('/register-step-2', {
        templateUrl: 'Register_Step_2.html', // REGISTER
        controller: 'RegisterStep2Controller',
        css: '../css/Register_Step_2.css'
    })
    .when('/register-step-3', {
        templateUrl: 'Register_Step_3.html', // REGISTER
        controller: 'RegisterStep3Controller',
        css: '../css/Register_Step_3.css'
    })
    .otherwise({
        redirectTo: '/'
    });
});