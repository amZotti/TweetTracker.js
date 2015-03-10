var Tweet = require("../db/dbClient.js").Tweet;
var keys = require("./APIkeys.js");
var plotly = require('plotly')(keys.username, keys.password);

//Graph generation filters
var city = "San Francisco";
var keyword = "the";

function graphTweets(city, keyword) {
  Tweet.find({city: city, keyword: keyword}, function(err, tweet) {
    var tweetData = filterTweetData(tweet, keyword);
    var data = [{x: tweetData[0], y: tweetData[1], type: 'scatter'}];
    var graphOptions = {filename: "date-axes"};

    plotly.plot(data, graphOptions, function (err, msg) {
      if (err) return console.log(err);
      console.log(msg);
    });
  });
}

function filterTweetData(tweet, keyword) {
  var times = [];
  var counts = [];
  for (var i = 0;i < tweet.length;i++) {
    times.push(tweet[i].createdAt);
    counts.push(i);
  }
  return [times, counts];
}

graphTweets(city, keyword);
