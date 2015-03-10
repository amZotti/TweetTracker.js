var Tweet = require("../db/dbClient.js").Tweet;
var TwitterClient = require("./twitterClient.js").TwitterClient;
var helper = require("./helpers.js");
var city = {coords: "-122.75,36.8,-121.75,37.8", name: "San Francisco"};
var keywords = [/javascript/, /ruby/, /club/, /facebook/, /google/, /cats/];

TwitterClient.stream("statuses/filter", {locations: city.coords}, function(stream) {
  console.log("Listening for tweets...");
  stream.on("data", function(tweet) {
    var keyword = helper.matchFirstKeyword(tweet, keywords);
    if (!!keyword) {
      keyword = helper.regexToString(keyword);
      Tweet.create({city: city.name, text: tweet.text, keyword: keyword});
      console.log("Keyword match: " + keyword);
      console.log("Tweet Text: " + tweet.text);
    }
  });
});