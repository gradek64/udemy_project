

var UserSet = function($q){//inject promise serice for callbacks;

	var user = {};
	//set empty string if localStorage is not defined;
	var stored_users = localStorage.getItem('usersSet') ? localStorage.getItem('usersSet'): '';

	//make collection of all users 
	var  arraySet = '['+stored_users+']'; //as array;
    var  allUsers = JSON.parse(arraySet); //as JSON



	this.checkUser = function(foundUser){

		var answer = 0;
		//initiate promise 
		var deferred = $q.defer();
		//determine what user type userName or email 
		var userData = /@/g.test(foundUser.username) ? 'email' : 'username';

		console.log(userData);

		console.log(foundUser);
		//check if the user is in database;
		angular.forEach(allUsers, function(object, key) {

			if(object[userData] == foundUser.username) {
				answer++;
			}

			if( object.password == foundUser.password){
				answer++;
			}

			if(key==allUsers.length-1) 
				if(answer == 2 ) deferred.resolve("success");
					else deferred.resolve("failed");

		});


		return deferred.promise;

	},
	this.findAllUsers = function(){

		console.log('works');

		var arraySet = '['+stored_users+']';
		var allUsers = JSON.parse(arraySet);


		return allUsers;
	},
	this.setUser = function(formDatObject){

			user.username = formDatObject.username;
			user.password = formDatObject.password;
			user.email = formDatObject.email;
			user.favoriteFood = formDatObject.favoriteFood;

			console.log(formDatObject);

			if(!localStorage.getItem('usersSet')){
						
						localStorage.setItem("usersSet", JSON.stringify(user));
						stored_users = localStorage.getItem('usersSet');
			} else {
		
						stored_users = localStorage.getItem('usersSet');
			 			stored_users += ','+ JSON.stringify(user);

						localStorage.setItem("usersSet", stored_users);
						
			}

			


	};

};

angular.module('routerApp').service('userFactory',UserSet);


