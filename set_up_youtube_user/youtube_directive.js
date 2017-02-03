angular.module('routerApp')
  .directive('youtube', function($window) {
  return {
    restrict: "EA",
    scope: {
      currentuser:'=currentUserData'
    },
    bindToController:{
      currentuserdata:'='
    },
    
    transclude:true,
    controllerAs: 'youtubeskeleton',//nested object in $scope.YoutubeController = this;
    controller:function($scope,$http,$element,$transclude){

      

      //controller = this;


      console.log('directive scope');
      console.log($scope);
      console.log('directive scope');

      //youtube player credentials
      //var youTubeUserChannelId = 'UC4T3sDyCBxkKofTKCBOXmsw';
      var youTubeUserProjectKey = 'AIzaSyDsD3do9M7JvtXE6ik7j15CDK1TiJ1-qDc';
      var playlistIdSet = 'PLbbyZNbQTePwVeo28XadtUm5pBwMR8IVb';
      //var playlistIdSet = 'PLmg3EMAUyebWuhQREdbx_HyM400jSKHXT';
      var listResults,listSet;


      //attach youtube API;
      var tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    

      /*[
                          { name: 'Super cool cam', type: 'x-sup-c' },
                          { name: 'Ultra cool cam', type: 'x-ult-c' } 
                      ];*/
            
      //get youtube API for playlist
     /* $http({
        url:"https://www.googleapis.com/youtube/v3/playlists",
        params:{
          part:'snippet',
          channelId:youTubeUserChannelId,
          maxResults:'10', //default is 5 results
          key:youTubeUserProjectKey


        }
      }).then(function(response) {
            angular.forEach(response,function(object,key){
              //console.log(object);

              angular.forEach(object.items,function(object,key){

                 angular.forEach(object.snippet,function(object,key){


                    //get playlist names;       
                    //console.log(object);
                    //get playlist names;       
                    //console.log(object);
                    //get playlist names;       
                    //console.log(object);
                    //get playlist names;       
                    //console.log(object);
                 });
                
              });
              



            })
      });
*/
      
        //refference to controller 
       var youtubecontent = this;
       youtubecontent.content = [];




      console.log('youtubecontent');
      console.log(youtubecontent);
      //this.test = 400;

       $http({
        url:"https://www.googleapis.com/youtube/v3/playlistItems",
        params:{
          part:'snippet',
          playlistId:playlistIdSet,
          maxResults:'10', //default is 5 results
          key:youTubeUserProjectKey


        }
      }).then(function(response) {
            //listResults = response.object.items.length

             console.log(response);

            angular.forEach(response,function(object,key){

                if(!listSet){ listResults = object.items.length; console.log(listResults); listSet =true;}

                

              angular.forEach(object.items,function(object,key){

                //console.log(object.items[key].snippet.resourceId.videoId);
                

                    //controller.slots = object.snippet;
                    youtubecontent.content[key] = {};
                    //get title;       
                    //console.log(object.snippet.channelTitle);
                    youtubecontent.content[key].title = object.snippet.title;

                    //video id;       
                    //console.log(object.snippet.resourceId.videoId);
                    youtubecontent.content[key].videoId = object.snippet.resourceId.videoId;

                    //thumbnails small; 
                    youtubecontent.content[key].pic = object.snippet.thumbnails.medium.url;

                    //channel by:
                    youtubecontent.content[key].channelTitle = object.snippet.channelTitle;    
                    
                    //description;                       
                    //youtubecontent[key].disc = object.snippet.description;

                    //set up first video from the player;

                    if(key==listResults-1){


                          Player.constructPlayer(youtubecontent.content[0].videoId);

                    }

 
              });
            })
      });


      //Player as singeleton;
      var Player = (function(){
            var player; //global for Player;
            return {
              constructPlayer:function(videoid){

               /* window.onYouTubeIframeAPIReady = function() {
                //your code here
                }*/
                console.log(videoid);

               player = new YT.Player('youtubePlayer', {
                  playerVars: {
                    autoplay: 0,
                    html5: 1,
                    theme: "light",
                    modesbranding: 0,
                    color: "white",
                    iv_load_policy: 3,
                    showinfo: 1,
                    controls: 1
                  },
                  //width: '600', 
                  //height: '480', 
                  videoId: videoid,
                  events:{
                    onReady:function(){
                        console.log('ready');
                    }
                  }
                });
              },
              changeVideo:function(videoid){
                 player.cueVideoById(videoid);
              }
            };

      })();

       //select Video for player from controller scope;
        youtubecontent.selectVideo = function(videoid){
            Player.changeVideo(videoid);
        };
              

        


        //attach to DOM
        $transclude($scope, function(transEl) {
          $element.append(transEl);
        });



    },
    //template: '<p>Product: {{product}}<br />Type: {{product}}</p>'//that staff goes inside <youtube></youtube>
    //template: '<div ng-repeat="' + attr.nestedex + '"><{{YoutubeController.test}}></div>',//that staff goes inside <youtube></youtube>

    link: function(scope, element,attrs) {} 
  };
});