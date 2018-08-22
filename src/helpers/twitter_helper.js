Helpers.TwitterHelper = {
    tweetIdFromTweetUrl: function(e) {
        return e.match(/status\/([0-9]+)/)[1];
    },
    tweetApiUrl: function(e) {
        return "https://api.twitter.com/1/statuses/show/" + e + ".json?callback=?&include_entities=true";
    },
    profileImageApiUrl: function(e, t) {
        if (t == null) {
            t = "normal"
        };
        return "https://api.twitter.com/1/users/profile_image/" + e + "?size=" + t;
    },
    userTimelineApiUrl: function(e, t) {
        return "https://api.twitter.com/1/statuses/user_timeline/" + e + ".json" + ("?messageCount=" + t + "&suppress_response_codes=1&include_rts=true&callback=?");
    },
    searchApiUrl: function(e, t) {
        var n;
        n = t ? "&" + $.param(t) : "";
        return "https://search.twitter.com/search.json?q=" + e + n + "&callback=?";
    },
    intentReplyUrl: function(e) {
        return "https://twitter.com/intent/tweet?in_reply_to=" + e;
    },
    intentRetweetUrl: function(e) {
        return "https://twitter.com/intent/retweet/?tweet_id=" + e;
    },
    intentFavoriteUrl: function(e) {
        return "https://twitter.com/intent/favorite/?tweet_id=" + e;
    }
};