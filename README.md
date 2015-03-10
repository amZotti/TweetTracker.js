<h1>TweetTracker.js</h1>
<p>
Running TwitterClient.js initiates a background process which listens
for tweets using Twitters streaming API. As tweets are received they
are filtered by keywords and location. Valid tweets are then persisted
to database storage.
</p>


<p>

<h2>How Database Storage Works</h2>
<p>A tweet is persisted to the database when it is in the correct
geographic range, and when it has at least one keyword match.
When a match occurs, the following are persisted to the database:

<ul>
  <li>Tweet message</li>
  <li>Matched keyword</li>
  <li>City where Tweet occurred</li>
  <li>CreatedAt timestamp</li>
</ul>

Including the timestamp along with the matched keyword allows us to perform
statistical analysis.</p>

<p>
If a tweet contains more than one keyword, the first keyword which is
detected will be the keyword that is persisted to the database. Tweets
containing more than one keyword will only have the very first keyword
detected count towards influencing keyword frequencies. The other
matched keywords in the tweet will be ignored and will not be accounted
for later in statistical calculations.
</p>
