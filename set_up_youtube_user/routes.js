//app.js
var routerApp = angular.module('routerApp');

routerApp.config(function($stateProvider, $urlRouterProvider,$locationProvider) { //depedency injections 
    
        
        // HOME STATES AND NESTED VIEWS ========================================
    $stateProvider.state('home', {
            url: '/',
            templateUrl: 'routes_template/home.html'
        })
        // nested list with custom controller
        .state('login', {
            url: '/login',
            templateUrl: 'routes_template/login.html'
        })
        .state('create', {
            url: '/create',
            templateUrl: 'routes_template/create_user.html'
           
        })
        .state('myvideos', {
            url: '/videos',
            templateUrl: 'routes_template/youtube_videos.html'
        });
       
        $locationProvider.html5Mode(true); 
        
});



    
 
