var Twitter = require('twitter');
var APIkeys = require('./APIkeys.js');
var TwitterClient = new Twitter({
  consumer_key: APIkeys.CONSUMER_KEY,
  consumer_secret: APIkeys.CONSUMER_SECRET,
  access_token_key: APIkeys.ACCESS_TOKEN,
  access_token_secret: APIkeys.ACCESS_TOKEN_SECRET
});

module.exports = {TwitterClient: TwitterClient};
