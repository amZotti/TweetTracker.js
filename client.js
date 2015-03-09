var Twitter = require('twitter');
var APIkeys = require('./APIkeys.js');
var SF = '-122.75,36.8,-121.75,37.8';

var client = new Twitter({
  consumer_key: APIkeys.CONSUMER_KEY,
  consumer_secret: APIkeys.CONSUMER_SECRET,
  access_token_key: APIkeys.ACCESS_TOKEN,
  access_token_secret: APIkeys.ACCESS_TOKEN_SECRET
});

client.stream('statuses/filter', {locations: SF}, function(stream) {
  stream.on('data', function(tweet) {
    console.log(tweet.text);
  });
 
  stream.on('error', function(error) {
    throw error;
  });
});
