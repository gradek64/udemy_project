angular.module('routerApp')
  .controller('tCtrl', function ( $state,$scope,$rootScope,userFactory) { //inject service USER;

            var fader;
            var user = {};
           

            var ctrl = this;
            ctrl.title = 'Ilfracombe';
            ctrl.pic = 'http://teropa.info/ilfracombe.jpg';
            ctrl.content = [
              'Ilfracombe /ˈɪlfrəkuːm/ is a seaside resort and civil parish on the North Devon coast, England with a small harbour, surrounded by cliffs.',
              'The parish stretches along the coast from \'The Coastguard Cottages\' in Hele Bay toward the east and 4 miles along The Torrs to Lee Bay toward the west. The resort is hilly and the highest point within the parish boundary is at \'Hore Down Gate\', 2 miles inland and 860 feet (270 m) above sea level.'
            ];
            



             $rootScope.$on("$locationChangeStart", function(event, next, current) { 

                 //allow go to private tabs only when user is looged;
                //if(!ctrl.logged){
                 // $state.go('home');
               // }

               

                if(!fader) { angular.element(document.getElementById('view')).removeClass('scale') }
                fader = false;
            });

    
             var redirect = function (currentUser) {
                 //redirect to home page;

                 console.log('currentUser');
                 console.log(currentUser);

                  //data stored for current user in the scope to grab for others 
                  ctrl.user =  currentUser;
                  ctrl.logged = 'LOGGED AS :' + currentUser.username; //{{logged in index header}}
                  $state.go('home');


                  /*** addtional ***/
                      //to get videoID of current user make them available in youtube directive in isoleted scope;
                      ctrl.currentUserData = currentUser.username;
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

               userFactory.checkUser(user).then(function(userBack) {
                  //set response to the controller 

                  userBack=='failed' ? ctrl.warning=true : redirect(userBack); 
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