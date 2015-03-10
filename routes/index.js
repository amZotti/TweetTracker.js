var express = require('express');
var router = express.Router();
var grapher = require('../services/graph/restfulGraphClient.js');
var criteria = require('../tweetDetectionCriteria.js');

router.get('/', function(req, res, next) {
  console.log("Updating Graph: ");
  grapher.graphTweets();
  res.render('index', {city: criteria.searchCity, keyword: criteria.searchKeyword});
});

module.exports = router;
