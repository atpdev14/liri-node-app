var fs = require("fs");
var keys = require("./keys.js");
var inq = require("inquirer");
var twitter = require("twitter");
var twitterKeys =  new twitter({
	consumer_key: keys.twitterKeys.consumer_key,
	consumer_secret: keys.twitterKeys.consumer_secret,
	access_token_key: keys.twitterKeys.access_token_key,
	access_token_secret: keys.twitterKeys.access_token_secret
});

inq.prompt([
	{
		type: "list",
		message: "What would you like to do?",
		choices: ["Check Tweets", "Look up a song on Spotify", "Look up a movie", "Do what it says"],
		name: "userCommand"
	}
	]).then(function(response){

		switch(response.userCommand){

			// ==========================
			// 		  CHECK TWEETS
			// ==========================

			case "Check Tweets":	
			var params = {screen_name: 'earthworm_ghost'};
				twitterKeys.get('statuses/user_timeline', params, function(error, tweets, response) {
				for(i = 0; i < 20; i++){
					console.log("Tweet " + (i+1)   + ": " + tweets[i].text);
					}
				});	
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
