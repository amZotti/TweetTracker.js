var Tweet = require("../db/dbClient.js").Tweet;
var keys = require("./APIkeys.js");
var Plotly = require('plotly')(keys.username, keys.password);

//Graph generation filters
var city = "San Francisco";
var keyword = "the";

var token = keys.token1;

// build a data object - see https://plot.ly/api/rest/docs for information
var data = {
  'x':[]
    , 'y':[]
    , 'type':'scatter'
    , 'mode':'lines+markers'
    , marker: {
      color: "rgba(31, 119, 180, 0.96)"
    }
  , line: {
    color:"rgba(31, 119, 180, 0.31)"
  }
  , stream: {
    "token": token
      , "maxpoints": 100
  }
}

Tweet.find({city: city, keyword: keyword}, function(err, tweet) {
  var tweetData = filterTweetData(tweet, keyword);
  data.x = tweetData[0];
  data.y = tweetData[1];
});

// build your layout and file options
var graphOptions = {
  "filename": "streamSimpleSensor"
    , "fileopt": "overwrite"
    , "layout": {
      "title": "streaming twitter data"
    }
  , "world_readable": true
}

/*
 * Call plotly.plot to set the file up.
 * If you have included a streaming token
 * you should get a "All Streams Go!" message
 */

Plotly.plot(data, graphOptions, function (err, resp) {
  if (err) return console.log("ERROR", err);
  console.log(resp);

  var i = 0;
  var stream = Plotly.stream(token, function () {});
  for (var i = 0;i < data.x.length;i++) {
    var tweet = JSON.stringify({x: data.x[i], y: data.y[i]});
    console.log(tweet);
    stream.write(tweet)
  }
  setInterval(function () {
    var streamObject = JSON.stringify({ x : i, y : i });
    stream.write(streamObject+'\n');
    i++;
  }, 1000);
})

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
