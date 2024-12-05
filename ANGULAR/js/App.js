var yogo = angular.module('yogo', [
    'ngRoute', 
    'ngSanitize',
    'NavBarController', 
    'HomeController', 
    'EventsController',
    'BlogsController',
    'RegisterController',
    'RegisterStep1Controller',
    'RegisterStep2Controller',
    'RegisterStep3Controller',
    'EventsService',
    'BlogsService',
    'MembersService',
    'HomeController_2',
    'VideoController',
    'VideoService'
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

yogo.run(function($rootScope, $route) {
    $rootScope.$on('$routeChangeSuccess', function() {
        if ($route.current && $route.current.title) {
            document.title = $route.current.title;
        }
    });
});

yogo.config(function ($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider
    .when('/', {
        templateUrl: 'Home.html', // Home page
        controller: 'HomeController',
        title: 'Home',
        css: '../css/Home.css'
    })
    .when('/home_2', {
        templateUrl: 'Home_2.html', // Home page
        controller: 'HomeController_2',
        css: '../css/Home_2.css'
    })
    .when('/events', {
        templateUrl: 'Events.html', // Events page
        controller: 'EventsController',
        title: 'Events',
        css: '../css/Events.css'
    })
    .when('/events/detail/:id', {
        templateUrl: 'Events_Detail.html', // Event Detail page
        controller: 'EventsController',
        title: 'Events Detail',
        css: '../css/Events_Detail.css'
    })
    .when('/list-event', {
        templateUrl: 'list-event.html', // List Event page
        controller: 'EventsController',
        title: 'List Event',
    })
    .when('/create-event', {
        templateUrl: 'create-event.html', // Create Event page
        controller: 'EventsController',
        title: 'Create Event',
    })
    .when('/update-event/:id', {
        templateUrl: 'update-event.html', // Update Event page
        controller: 'EventsController',
        title: 'Update Event',
    })
    .when('/blogs', {
        templateUrl: 'Blogs.html', // Blogs page
        controller: 'BlogsController',
        title: 'Blogs',
        css: '../css/Blog.css'
    })
    .when('/blogs/detail/:id', {
        templateUrl: 'Blog_Detail.html', // Blog Detail page
        controller: 'BlogsController',
        title: 'Blogs Detail',
        css: '../css/Blog_Detail.css'
    })
    .when('/list-blog', {
        templateUrl: 'list-blog.html', // List Blog page
        controller: 'BlogsController',
        title: 'List Blog',
    })
    .when('/create-blog', {
        templateUrl: 'create-blog.html', // Create Blog page
        controller: 'BlogsController',
        title: 'Create Blog',
    })
    .when('/update-blog/:id', {
        templateUrl: 'update-blog.html', // Update Blog page
        controller: 'BlogsController',
        title: 'Update Blog',
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
    .when('/videos', {
        templateUrl: 'Videos.html', // Videos
        controller: 'VideoController',
        css: '../css/Videos.css'
    })
    .when('/list-video', {
        templateUrl: 'Dashboard/list-video.html', // List Event page
        controller: 'VideoController',
        css: '../css/List_Video.css'
    })
    .when('/create-video', {
        templateUrl: 'Dashboard/create-video.html', // Create Event page
        controller: 'VideoController',
        css: '../css/Upload_Video.css'
    })
    .when('/update-video', {
        templateUrl: 'Dashboard/update-video.html', // Update Event page
        controller: 'VideoController',
    }) 
    .otherwise({
        redirectTo: '/'
    });
});