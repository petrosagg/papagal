var r, o = function(e, t) {
    return function() {
        return e.apply(t, arguments);
    };
}, i = function(e, t) {
    function n() {
        this.constructor = e;
    }
    for (var r in t) {
        if (s.call(t, r)) {
            e[r] = t[r]
        };
    }
    n.prototype = t.prototype;
    e.prototype = new n();
    e.__super__ = t.prototype;
    return e;
}, s = {}.hasOwnProperty;

r = require("unicode-substring");

Presenters.TeamInbox.Twitter = function(e) {
    function Twitter() {
        this.actions = o(this.actions, this);
        return Twitter.__super__.constructor.apply(this, arguments);
    }
    var n, s, a, u, l, c;
    i(Twitter, e);
    Twitter.prototype.icon = function() {
        return Flowdock.icons.twitter;
    };
    Twitter.prototype.author = function() {
        var e, t, n;
        e = ((n = this.retweet()) != null ? n.user : void 0) || this.content.user;
        t = l(e.screen_name);
        return {
            name: e.name,
            link: t,
            partial: Presenters.Helper.render("twitter/author", {
                author: e,
                profileLink: t
            })
        };
    };
    Twitter.prototype.avatar = function() {
        var e;
        return (e = function(e) {
            return e.replace(/_normal\./, "_reasonably_small.");
        })(this.retweet() ? this.retweet().user.profile_image_url_https || this.retweet().user.profile_image_url : this.content.user.profile_image_url_https || this.content.user.profile_image_url);
    };
    Twitter.prototype.headline = function() {
        return this.tweetText();
    };
    Twitter.prototype.singleViewHtmlHeadline = function() {
        return this.formatTweet();
    };
    Twitter.prototype.htmlHeadline = function() {
        return this.author().partial + "<br> " + this.formatTweet();
    };
    Twitter.prototype.summary = function() {
        var e, t;
        t = this.author().name;
        e = "tweeted:";
        if (this.retweet()) {
            e = "retweeted by " + this.content.user.name + ":"
        };
        return t + " " + e + " " + this.tweetText();
    };
    Twitter.prototype.body = function() {
        var e, t, n;
        t = (n = this.entities()) != null ? n.media : void 0;
        if (t == null) {
            return null;
        }
        e = t.reduce(function(e, t) {
            if (t.type === "photo") {
                e = $(e).add($("<a>").attr("href", t.expanded_url).html($("<img>").attr({
                    src: t.media_url_https,
                    alt: "Twitter photo"
                })))
            };
            return e;
        }, $());
        return e[0].outerHTML;
    };
    Twitter.prototype.action = function() {};
    Twitter.prototype.link = function() {
        return l(this.content.user.screen_name, this.content.id_str);
    };
    Twitter.prototype.timestampLink = function() {
        return this.link();
    };
    Twitter.prototype.meta = function() {
        var e, t, n, r;
        e = [];
        n = this.content.in_reply_to_screen_name;
        t = this.content.in_reply_to_status_id_str;
        r = this.retweet();
        if (n) {
            e.push({
                text: "in reply to @" + n,
                link: l(n, t)
            })
        };
        if (r) {
            e.push({
                text: "retweeted by " + this.content.user.name,
                link: l(this.content.user.screen_name)
            })
        };
        return e;
    };
    Twitter.prototype.actions = function() {
        return [ {
            text: "reply",
            link: Helpers.TwitterHelper.intentReplyUrl(this.content.id_str),
            className: "reply"
        }, {
            text: "retweet",
            link: Helpers.TwitterHelper.intentRetweetUrl(this.content.id_str),
            className: "retweet"
        }, {
            text: "favorite",
            link: Helpers.TwitterHelper.intentFavoriteUrl(this.content.id_str),
            className: "star"
        } ];
    };
    Twitter.prototype.entities = function() {
        if (this.retweet()) {
            return this.retweet().entities;
        }
        return this.content.entities;
    };
    Twitter.prototype.retweet = function() {
        return this.content.retweeted_status;
    };
    Twitter.prototype.tweetText = function() {
        var e, t;
        t = ((e = this.retweet()) != null ? e.text : void 0) || this.content.text;
        return t.replace(/[<>]/g, function(e) {
            var t;
            t = {
                "<": "&lt;",
                ">": "&gt;"
            };
            return t[e];
        });
    };
    Twitter.prototype.formatTweet = function() {
        if (this.entities()) {
            return this.applyEntities();
        }
        return this.tweetText();
    };
    Twitter.prototype.applyEntities = function() {
        var e, t, n, o, i, s, a;
        for (o = function(e) {
            return function(t) {
                return e.entities()[t] || [];
            };
        }(this), a = this.tweetText(), e = o("urls").concat(o("hashtags"), o("user_mentions"), o("media")), 
        e = e.sort(function(e, t) {
            return (e != null ? e.indices[0] : void 0) - (t != null ? t.indices[0] : void 0);
        }).reverse(), n = function(e) {
            var t, n, o, i, s;
            t = e.indices[0];
            s = e.indices[1];
            i = r(a, 0, t);
            n = r(a, t, s);
            o = r(a, s);
            return a = "" + i + u(n, e) + o;
        }, i = 0, s = e.length; s > i; i++) {
            t = e[i];
            n(t);
        }
        return a;
    };
    l = function(e, t) {
        var n;
        if (t == null) {
            t = null
        };
        n = "https://twitter.com/" + e;
        if (t != null) {
            n = n + "/status/" + t
        };
        return n;
    };
    u = function(e, t) {
        if (t.screen_name) {
            return c(t);
        }
        if (t.url) {
            return s(t);
        }
        if (t.text) {
            return n(t);
        }
        return;
    };
    a = function(e) {
        return $("<div/>").text(e).html();
    };
    n = function(e) {
        var t;
        t = a(e.text);
        return "<a href='https://twitter.com/search/?q=" + encodeURIComponent("#" + t) + "'>#" + t + "</a>";
    };
    c = function(e) {
        var t;
        t = a(e.screen_name);
        return "<a href='https://twitter.com/" + encodeURIComponent(t) + "'>@" + t + "</a>";
    };
    s = function(e) {
        return "<a href='" + a(e.expanded_url) + "'>" + a(e.display_url) + "</a>";
    };
    return Twitter;
}(Presenters.InboxMessage);