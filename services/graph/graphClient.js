var Tweet = require("../db/dbClient.js").Tweet;
var keys = require("./APIkeys.js");
var plotly = require('plotly')(keys.username, keys.password);
var city = "San Francisco";

function graphTweets() {
  Tweet.find({city: city}, function(err, tweet) {
    var data = [{x: getTweetTimes(tweet), y: getTweetKeywords(tweet), type: 'scatter'}];
    console.log(data);
    var graphOptions = {filename: "date-axes"};

    plotly.plot(data, graphOptions, function (err, msg) {
      if (err) return console.log(err);
      console.log(msg);
    });
  });
}

function getTweetTimes(tweet) {
  var result = [];
  for (var i = 0;i < tweet.length;i++) {
    result.push(tweet[i].createdAt);
  }
  return result;
}

function getTweetKeywords(tweet) {
  var result = [];
  for (var i = 0;i < tweet.length;i++) {
    result.push(tweet[i].keyword);
  }
  return result;
}
graphTweets();
