//app.js
var routerApp = angular.module('routerApp', ['ngAnimate','ui.router']);

routerApp.config(function($stateProvider, $urlRouterProvider,$locationProvider) { //depedency injections 
    
    //$urlRouterProvider.otherwise('/home'); //general index page;
    
    $stateProvider

    //check this for routes animations ;


    //http://codepen.io/alexandremasy/pen/mDcEd
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'routes_template/home.html'
        })
        // nested list with custom controller
        .state('login', {
            url: '/login',
            templateUrl: 'routes_template/login.html',
            controller: function($scope) {
                //$scope.dogs = ['Bernese', 'Husky', 'Goldendoodle'];
            }
        })
        // nested within login page;
        /*.state('login.create', {
            url: '/create',
            templateUrl: 'routes_template/create_user.html'
        })*/
        .state('create', {
            url: '/create',
            templateUrl: 'routes_template/create_user.html',
            data: { transition: 'slide-left' },
            /*,resolve:{ 
              animation :function(){
                    return 'slide-left'}
            }
            controller: function($scope,$state,animation){
                //console.log(animation);
                //$scope.animation = animation;
                //$state.go('create');
            },
            onEnter: function($rootScope,animation){
                //console.log(animation);
                // $rootScope.animation = animation;
                 
            }*/
        })
       /* .state('loginBack', {
            url: '/loginBack',
            templateUrl: 'routes_template/login.html',
            resolve:{ animation : 'slide-right'},
            onEnter: function(animation){
                console.log(animation);
            }
        })*/
    
        
        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('myvideos', {
            url: '/videos',
            templateUrl: 'routes_template/youtube_videos.html'
        });
       

        $locationProvider.html5Mode(true); //angular will not user hashes values to excess routes; by 
        //default angular uses hashes values as /#!/home but most browser suppport html5mode so we safe to use that in our project;
        
});



    routerApp.controller('tCtrl', function ($state, $scope) {
              // transitions
              this.tabs = ['slide-left', 'slide-right'];
              
              
              // on button click
              this.stateChange = function (tab) {
                this.transition = 'slide-left';

                    console.log(this.transition);

                //this.bg = colorList[(Math.floor(Math.random()*listLast))];
                $state.go(tab);
                
                
              };
  
    })
     // $rootScope.$on('$routeChangeStart', function(event, currRoute, prevRoute){
       // $rootScope.animation = currRoute.animation;
      //});
    //});


