var express = require('express');
var router = express.Router();
var grapher = require('../services/graph/restfulGraphClient.js');

router.get('/', function(req, res, next) {
  console.log("Updating Graph: ");
  grapher.graphTweets();
  res.render('index', { title: 'Express' });
});

module.exports = router;
