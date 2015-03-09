var Tweet = require('./dbClient.js').Tweet;
var Twitter = require('twitter');
var APIkeys = require('./APIkeys.js');
var SF = '-122.75,36.8,-121.75,37.8';
var keywords = [/javascript/, /ruby/, /san/, /the/];

var TwitterClient = new Twitter({
  consumer_key: APIkeys.CONSUMER_KEY,
  consumer_secret: APIkeys.CONSUMER_SECRET,
  access_token_key: APIkeys.ACCESS_TOKEN,
  access_token_secret: APIkeys.ACCESS_TOKEN_SECRET
});

TwitterClient.stream('statuses/filter', {locations: SF}, function(stream) {
  console.log("Listening for tweets...");
  stream.on('data', function(tweet) {
    if (tweetContainsKeywords(tweet)) {
      Tweet.create({city: "SF", text: tweet.text, keyword: 'test'});
      console.log("Persisting tweet: " + tweet.text);
    }
  });
 
  stream.on('error', function(error) {
    console.log("error: " + error);
  });
});

function tweetContainsKeywords(tweet) {
  for (var i = 0;i < keywords.length;i++) {
    if (keywords[i].test(tweet.text))
      return true;
  }
  return false;
}

