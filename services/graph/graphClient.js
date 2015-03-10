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
  var minuteIntervals = [];
  var frequency = [];
  var currentMinute;
  var count = 0;
  for (var i = 0;i < tweet.length;i++) {
    var time = roundMinutes(tweet[i].createdAt);
    count++;
    if (+time !== +currentMinute) {
      minuteIntervals.push(formatDate(time));
      frequency.push(count);

      //reset
      currentMinute = time;;
      count = 0;
    }
  }
  return [minuteIntervals, frequency];
}

function formatDate(date) {
  return (date.getHours() + ":") + (" " + date.getMinutes());
}

function roundMinutes(date) {
  date.setMinutes(date.getMinutes() + Math.round(date.getSeconds()/60));
  date.setMilliseconds(0);
  date.setSeconds(0);

  return date;
}

graphTweets(city, keyword);
