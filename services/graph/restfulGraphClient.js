var Tweet = require("../db/dbClient.js").Tweet;
var keys = require("./APIkeys.js");
var plotly = require('plotly')(keys.username, keys.password);
var search = require('../../tweetDetectionCriteria.js');

var city = search.searchCity;
var defaultKeyword = search.searchKeyword;

function graphTweets(city, keyword) {
  Tweet.find({city: city, keyword: keyword}, function(err, tweet) {
    var tweetData = filterTweetData(tweet, keyword);
    var data = [{x: tweetData[0], y: tweetData[1], type: 'scatter'}];

    var graphOptions = {
      "filename": "TweetTracker", 
      "fileopt": "overwrite", 
      "layout": {
        "title": "streaming twitter data"
      },
      "world_readable": true
    };

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

module.exports = {
  graphTweets: function(keyword) {
    if (keyword !== undefined) 
      keyword = RegExp(keyword);
    else 
      keyword = defaultKeyword;
    graphTweets(city, keyword);
  }
};
