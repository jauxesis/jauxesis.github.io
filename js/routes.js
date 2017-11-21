var app = angular.module("myApp", ["ngRoute"]);
app.config(function($routeProvider) {
    
    $routeProvider
    .when("/", {
        templateUrl : "template/home.html"
    })
    .when("/home", {
        templateUrl : "template/home.html"
    })
    .when("/login", {
        templateUrl : "template/login.html"
    });

    $routeProvider
    .otherwise({templateUrl:"login.html"});
    
});
