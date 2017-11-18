var fs = require("fs");
var keys = require("./keys.js");
var inq = require("inquirer");
var twitter = require("twitter");
var twitterKeys =  new twitter(keys.twitterKeys);
console.log("Twitter Keys: " + twitterKeys);

inq.prompt([
	{
		type: "list",
		message: "What would you like to do?",
		choices: ["Check Tweets", "Look up a song on Spotify", "Look up a movie", "Do what it says"],
		name: "userCommand"
	}
	]).then(function(response){
		console.log("You selected: " + response.userCommand);

		switch(response.userCommand){

			// ==========================
			// 		  CHECK TWEETS
			// ==========================

			case "Check Tweets":
				twitterKeys.get('favorites/list', function(tweets, response) {
					console.log(tweets);
				});	


				// console.log("Logging from switch- Twitter");
				// var twitterUser = {screen_name: "earthworm_ghost"};
				// twitterKeys.get("statuses/user_timeline", twitterUser, function(error, tweets, response){
				// 	if(error){
				// 		console.log(error);
				// 	}
				// });
			break;

			// ==========================
			// 			SPOTIFY
			// ==========================

			case "Look up a song on Spotify":
				console.log("Logging from switch- Spotify");
			break;
			
			// ==========================
			// 			MOVIE
			// ==========================

			case "Look up a movie":
				console.log("Logging from switch- Movie");
			break;
			
			// ==========================
			// 		DO WHAT IT SAYS
			// ==========================

			case "Do what it says":
				console.log("Logging from switch- Do what it says");
			break;
		}; 

	});
