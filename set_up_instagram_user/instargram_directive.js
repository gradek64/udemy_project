angular.module('routerApp')
  .directive('instagramFeed', function() {
			  return {

			    controllerAs: 'directive_ctrl',
			    bindToController: {
			      currentUserMain:'=controllerScopeUser'// to pass currentUser to directive_ctrl'
			    },
			    templateUrl: 'myCardNestedTemplate',
			    transclude: true,
			    controller: function($scope,$http) {

			    	//second tokken 4465557703.179326a.5b1428876fe6409598c5101475840731

			    	console.log('inside direcitve');
			    	console.log($scope);

			    	var instagramFeed = this;
			    	instagramFeed.content = [];

					 $http({
					 	//https://api.instagram.com/v1/users/self/media/recent/?access_token=4465557703.179326a.5b1428876fe6409598c5101475840731
				        url:"https://api.instagram.com/v1/users/self/media/recent/",
				        params:{    //this linl alllow to pull your own content only
				          access_token:'4465557703.179326a.5b1428876fe6409598c5101475840731'
				        }
				      }).then(function(response) {

				      			   	//user info 
				      			   	var userinfo = response.data.data[0].user;
				      			   	instagramFeed.full_name = userinfo.full_name;
				      			   	instagramFeed.username = userinfo.username;
				      			   	instagramFeed.profile_pic_url = userinfo.profile_picture;
				      			   	//user data is repeate for every image so it is better to get if from first image not loop all through;

				      			  angular.forEach(response.data.data,function(object,key){

				      			        //set object on array;
				      			        instagramFeed.content[key] = {};

				      			        //get image url;       
				      			        instagramFeed.content[key].imageUrl = object.images.standard_resolution.url;

				      			        //get image instgram <a> link;       
				      			        instagramFeed.content[key].instagramLink = object.link;


				      			  });

				      });


			    },
			  };
			});