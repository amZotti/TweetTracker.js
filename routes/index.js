var express = require("express");
var router = express.Router();
var grapher = require("../services/graph/restfulGraphClient.js");
var criteria = require("../tweetDetectionCriteria.js");
var helper = require("../services/listen/helpers.js");

var city = criteria.searchCity;
var keyword = criteria.searchKeyword;
var keywords = helper.regexesToStrings(criteria.detectKeywords);


router.get("/", function(req, res, next) {
  console.log("Updating Graph: ");
  grapher.graphTweets();
  res.render("index", {city: city, keyword: keyword, keywords: keywords});
});

router.get("/api/data", function(req, res) {
  res.send({city: city, keyword: keyword, keywords: keywords});
});

module.exports = router;
