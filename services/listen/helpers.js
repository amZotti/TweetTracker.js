module.exports = {};

module.exports.matchFirstKeyword = function(tweet, keywords) {
  for (var i = 0;i < keywords.length;i++) {
    if (keywords[i].test(tweet.text)) {
      return keywords[i];
    }
  }
};

module.exports.regexToString = function(regex) {
  var str = regex.toString();
  return str.substring(1, str.length - 1);
};

module.exports.regexesToStrings = function(regexes) {
  var result = [];
  for (var i = 0;i < regexes.length;i++) {
    result.push(this.regexToString(regexes[i]));
  }
  return result;
}
