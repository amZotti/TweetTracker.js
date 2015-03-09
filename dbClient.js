var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/tweets');
var db = mongoose.connection;

var tweetSchema = mongoose.Schema({
  text: String,
  createdAt: { type: Date, default: Date.now },
  city: String,
  keyword: String
});

var Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = {Tweet: Tweet};

//Creation
//Tweet.create({city: "SF", text: "LOL BBQ", keyword: "ruby"});

//Retrieval
//Tweet.find({city: "SF"}, function(err, tweet) {console.log(tweet)});
