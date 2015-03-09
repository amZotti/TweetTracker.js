var Tweet = require('./dbClient.js').Tweet;
var TwitterClient = require('./twitterClient.js').TwitterClient;
var SF = '-122.75,36.8,-121.75,37.8';
var keywords = [/javascript/, /ruby/, /san/, /the/];

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

