angular.module('routerApp')
  .controller('tCtrl', function ( $state,$scope,$rootScope,userFactory) { //inject service USER;

            var fader;
            var user = {};
            var controllerScope = this;
             $rootScope.$on("$locationChangeStart", function(event, next, current) { 

                 //allow go to private tabs only when user is looged;
                //if(!controllerScope.logged){
                 // $state.go('home');
               // }

               

                if(!fader) { angular.element(document.getElementById('view')).removeClass('scale') }
                fader = false;
            });

    
             var redirect = function (currentUser) {
                 //redirect to home page;
                  controllerScope.logged = 'LOGGED AS :' + currentUser.username; //{{logged in index header}}
                  $state.go('home');
             }
                this.logOut = function (tab) {
                     //window.location.assign("http://www.w3schools.com");
                     window.location.assign("http://localhost:8888/");
                }

              //this = $scope.tCtrl
              // on button click
              this.stateChange = function (tab) {
                console.log(tab);
                this.transition = 'scale';
                fader = true;

                $state.go(tab);
              };
              this.submitUser = function () {
                  user.username = this.usernameLog;//angular.element( "#inputName" ).val();
                  user.password = this.passwordLog;

               userFactory.checkUser(user).then(function(response) {
                  //set response to the controller 

                  response=='failed' ? controllerScope.warning=true : redirect(user); 
                    console.log("Your name is: " + response);
                  }, function(result) {
                    console.log("The request failed: " + result);
                  });


              };

            /*userSetUp*/
            this.createUser = function(){
                  
                  user.username = this.username;//angular.element( "#inputName" ).val();
                  user.password = this.password;
                  user.email = this.email;
                  user.favoriteFood = this.favoriteFood;

                  //send to factory to process;
                  userFactory.setUser(user);

                  redirect(user);

            };

         



            this.showUsers = function(){ 
              console.log('agagaga');
            };




    });