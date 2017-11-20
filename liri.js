var fs = require("fs");
var request = require("request"); 
var keys = require("./keys.js");
var inq = require("inquirer");
var twitter = require("twitter");
var twitterKeys =  new twitter({
	consumer_key: keys.twitterKeys.consumer_key,
	consumer_secret: keys.twitterKeys.consumer_secret,
	access_token_key: keys.twitterKeys.access_token_key,
	access_token_secret: keys.twitterKeys.access_token_secret
});
var spotify = require("node-spotify-api");
var spotifyKeys = new spotify({
		id: keys.spotifyKeys.id,
		secret: keys.spotifyKeys.secret
});

var omdb = require("omdb");

function checkTweets(){
	var params = {screen_name: 'earthworm_ghost'};
				twitterKeys.get('statuses/user_timeline', params, function(error, tweets, response) {
				for(i = 0; i < 20; i++){
					console.log("Tweet " + (i+1)   + ": " + tweets[i].text);
					}
				});	
};




function searchSpotify() {
	inq.prompt([
					{
						type: "input",
						message: "What song would you like to search for?",
						name: "searchInput"
					}
					]).then(function(response){
						if(response.searchInput === ""){response.searchInput = "The Sign Ace of Base";}
						spotifyKeys.search({ type: 'track', query: response.searchInput }, function(err, data) {
  							if (err) {
    							return console.log('Error occurred: ' + err);
  							}
  							
							for(var i=0; i < 10; i++){
								var songInfo = {
									songName: data.tracks.items[i].name,
									artist: data.tracks.items[i].album.artists[0].name,
									album: data.tracks.items[i].album.name,
									url: data.tracks.items[i].external_urls.spotify
								};
							console.log("\n");
							console.log("Song Info: " + JSON.stringify(songInfo, null, 2));
							};
						})
					});

};


function searchMovie() {
		inq.prompt([
					{
						type: "input",
						message: "What movie would you like to search for?",
						name: "searchInput"
					}
					]).then(function(response){
						if(response.searchInput === ""){
							response.searchInput = "Popeye";
						}
						request("http://www.omdbapi.com/?t=" + response.searchInput + "&y=&plot=short&apikey=trilogy", function(error, response, body) {
							var movieInfo = JSON.parse(body);
							console.log("Title: " + movieInfo.Title);
							console.log("Released: " + movieInfo.Released);
							console.log("IMDB Rating: " + movieInfo.Ratings[0].Value);
							console.log("Rotten Tomatoes Rating: " + movieInfo.Ratings[1].Value);
							console.log("Country of origin: " + movieInfo.Country);
							console.log("Language: " + movieInfo.Language);
							console.log("Plot: " + movieInfo.Plot);
							console.log("Actors: " + movieInfo.Actors); 
							console.log("\n");
							console.log("\n");
						});
					});
};


function callFunction(arg){
	if(arg === "Check Tweets"){
		checkTweets();
	}else if(arg === "Look up a song on Spotify"){
		searchSpotify();
	}else if(arg === "Look up a movie"){
		searchMovie();
	}else {
		console.log("Not a valid command.");
	}
};


// ==============================================================================
// 		 				 Inquirer Function
// ==============================================================================


 inq.prompt([
	{
		type: "list",
		message: "What would you like to do?",
		choices: ["Check Tweets", "Look up a song on Spotify", "Look up a movie", "Read from random.txt"],
		name: "userCommand"
	}
	]).then(function(response){

		switch(response.userCommand){

			// ==========================
			// 		  CHECK TWEETS
			// ==========================

			case "Check Tweets":	
			 	checkTweets();
			break;

			// ==========================
			// 			SPOTIFY
			// ==========================

			case "Look up a song on Spotify":
				searchSpotify()
			break;
			
			// ==========================
			// 			MOVIE
			// ==========================

			case "Look up a movie":
				searchMovie();
			break;
			
			// ==========================
			// 	  Read from Random.txt
			// ==========================

			case "Read from random.txt":
				fs.readFile("random.txt", "utf8", function(error, data){
					if(error){
						return console.log(error);
					}
					var dataArr = data.split(",");
					var command = dataArr[0];
					var searchTerm = dataArr[1];
					console.log(command);
					callFunction(command);
					

				});
			break; 
		}; 

	});
