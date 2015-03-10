<h1>TweetTracker.js</h1>
<p>TweetTracker.js is a tool for creating data visualizations of Tweet data.
Users have the ability to select from a range of keywords
and view graphs generated in real time based on their keyword selection.
TweetTracker.js runs a background process which listens
for tweets using Twitters streaming API. As tweets are received they
are filtered by keywords and location. Valid tweets are then persisted to the
database and later retrieved to generate a dynamic graph based on user
input.</p>

<h3>Demo Screenshot</h3>
<img src="http://i.imgur.com/RwDJXya.png"></img>

<h2>Technologies Used</h2>
  <ul>
    <li><a href="http://en.wikipedia.org/wiki/MEAN">MEAN stack</a></li> 
    <ul>
      <li><a href="http://www.mongodb.org/">MongoDB</a></li>
      <li><a href="http://expressjs.com/">Express.js</a></li>
      <li><a href="https://angularjs.org/">Angular.js</a></li>
      <li><a href="https://nodejs.org/">Node.js</a></li>
    </ul>
    <li><a href="http://mongoosejs.com/">Mongoose.js</a></li>
    <li><a href="https://plot.ly/">Plotly</a></li>
    <li><a href="https://dev.twitter.com/streaming/overview">Twitter Streaming API</a></li>
  </ul>


<h2>How TweetTracker.js Storage Works</h2>
<p>A tweet is persisted to MongoDB when it is in the correct
geographic range, and when it has at least one keyword match.
When a match occurs, the following attributes are persisted to MongoDB:

<ul>
  <li>Tweet message</li>
  <li>Matched keyword</li>
  <li>City where Tweet occurred</li>
  <li>CreatedAt timestamp</li>
</ul>

<p>
If a tweet contains more than one keyword, the first keyword which is
detected will be the keyword that is persisted to the database. Tweets
containing more than one keyword will only have the very first keyword
detected count towards influencing keyword frequencies. The other
matched keywords in the tweet will be ignored and will not be accounted
for later during the graph generation phase.
</p>

<h4>History of TweetTracker.*</h4>
<p>TweetTracker.js is the successor of <a
href="https://github.com/amZotti/TweetTracker.rb">TweetTracker.rb</a>.
TweetTracker.js has the following advantages over its predecessor:</p>

<ul>
  <li><b>Dramatic increase in performance</b>. JavaScript's asynchronous nature makes
running multiple background processes (<i>such as listening for tweets/persisting tweets to
database</i>) simple and efficient.</li>
  <li><b>Improved user experience</b>. Users can now select the keywords that are
being listened to and generate graphs in real time.</li>
  <li><b>Dynamic and customizable graphs</b>. Users have the ability to
manipulate graph data directly from their browsers.</li>
  <li><b>Source code has increased readability</b>. Enough said</li>
</ul>
