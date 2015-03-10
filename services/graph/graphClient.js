var keys = require("./APIkeys.js");
var plotly = require('plotly')(keys.username, keys.password);

var data = [{x:[0,1,2], y:[3,2,1], type: 'bar'}];
var layout = {fileopt : "extend", filename : "nodenodenode"};

plotly.plot(data, layout, function (err, msg) {
    if (err) return console.log(err);
    console.log(msg);
});
