var Tweet = require("../db/dbClient.js").Tweet;
var TwitterClient = require("./twitterClient.js").TwitterClient;
var helper = require("./helpers.js");
var detect = require('../../tweetDetectionCriteria.js');
var city = detect.detectCity;
var keywords = detect.detectKeywords;
console.log("DETECTING KEYWORDS:\n" + keywords + "\n CITY:\n" + city.name);

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
